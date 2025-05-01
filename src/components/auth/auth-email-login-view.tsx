'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { z, ZodError } from 'zod'

import { ROUTES } from '~/config/routes'
import logger from '~/core/logger'
import { authClient } from '~/lib/auth-client'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'

const formSchema = z.object({
    email: z.string().email(),
})

type FormSchema = z.infer<typeof formSchema>

interface Props {
    onSuccess: () => void
}

const MAX_OTP_LENGTH = 6
const OTP_CLASS_NAME = 'size-16'

export const AuthEmailLoginView = ({ onSuccess }: Props) => {
    const { t } = useTranslation(['common'])
    const router = useRouter()

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    })

    const [isSent, setIsSent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSendVerificationOTP = async ({ email }: FormSchema) => {
        try {
            setIsLoading(true)

            const response = await authClient.emailOtp.sendVerificationOtp({ email, type: 'sign-in' })

            if (response.error) {
                throw new Error(response.error.message)
            }

            setIsSent(true)
            onSuccess()

            toast.success(t('common:success.verificationOTPSent'))
        } catch (error) {
            if (error instanceof ZodError) {
                toast.error(t('common:error.invalidEmail'))
            }

            if (error instanceof Error && error.message.includes('User already exists')) {
                toast.error(t('common:error.userAlreadyExists'))
            }

            logger.error(`Failed to send verification OTP: ${error}`)
        } finally {
            setIsLoading(false)
        }
    }

    const handleVerifyOTP = async (otp: string) => {
        try {
            setIsLoading(true)
            const { email } = form.getValues()
            z.string().length(6).parse(otp)

            const response = await authClient.signIn.emailOtp({ email, otp })

            if (response.error) {
                throw new Error(response.error.message)
            }

            toast.success(t('common:success.verificationOTPVerified'))
            router.push(ROUTES.DASHBOARD.INDEX)
        } catch (error) {
            if (error instanceof Error || (typeof error === 'string' && error.includes('Invalid OTP'))) {
                toast.error(t('common:error.invalidOTP'))
            }

            if (error instanceof ZodError) {
                toast.error(t('common:error.invalidOTP'))
            }

            if (error instanceof Error && error.message.includes('Too many attempts')) {
                toast.error(t('common:error.tooManyAttempts'))
            }

            logger.error(`Failed to verify OTP: ${error}`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            {!isSent ? (
                <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSendVerificationOTP)}>
                    <Input placeholder={t('common:input.placeholder.email')} {...form.register('email')} />
                    <Button isLoading={isLoading} type="submit">
                        {t('common:continue')}
                    </Button>
                </form>
            ) : (
                <>
                    <InputOTP disabled={isLoading} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onComplete={handleVerifyOTP}>
                        <InputOTPGroup>
                            {Array.from({ length: MAX_OTP_LENGTH }).map((_, index) => (
                                <InputOTPSlot key={index} autoFocus={index === 0} index={index} className={OTP_CLASS_NAME} />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                </>
            )}
        </div>
    )
}
