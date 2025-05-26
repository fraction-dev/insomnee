'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trans, useTranslation } from 'react-i18next'

import { ROUTES } from '~/config/routes'
import { signIn } from '~/lib/shared/auth-client'

import { Button } from '../ui/button'

export const AuthLoginView = () => {
    const { t } = useTranslation(['auth'])

    const handleGoogleLogin = () => {
        signIn.social({
            provider: 'google',
            callbackURL: `${window.location.origin}${ROUTES.DASHBOARD.INDEX}`,
        })
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-medium">{t('auth:login.title')}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{t('auth:login.description')}</p>

                <Button onClick={handleGoogleLogin}>
                    <Image src="/images/logos/google.svg" alt="Google" width={20} height={20} />
                    <span>{t('auth:login.continueWithGoogle')}</span>
                </Button>
            </div>

            <p className="text-muted-foreground text-xs leading-relaxed">
                <Trans
                    i18nKey="auth:login.terms"
                    components={{
                        1: (
                            <Link href={ROUTES.TERMS} className="underline">
                                {t('common:termsOfService.title')}
                            </Link>
                        ),
                        2: (
                            <Link href={ROUTES.PRIVACY} className="underline">
                                {t('common:privacyPolicy.title')}
                            </Link>
                        ),
                    }}
                />
            </p>
        </div>
    )
}
