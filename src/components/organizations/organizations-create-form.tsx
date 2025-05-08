'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { ROUTES } from '~/config/routes'
import { SUPPORTED_CURRENCIES } from '~/consts/supported-currencies'
import { SUPPORTED_LANGUAGES } from '~/consts/supported-languages'
import logger from '~/core/logger'
import { useCreateOrganization } from '~/hooks/organization/useCreateOrganization'

import { FormField } from '../shared/form-field'
import { Select } from '../shared/select'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import { Input } from '../ui/input'

const formSchema = z.object({
    name: z.string().min(1),
    websiteUrl: z.string().url(),
    defaultLanguage: z.string().min(1),
    defaultCurrency: z.string().min(1),
    phone: z.string().min(1),
})

type FormSchema = z.infer<typeof formSchema>

export const OrganizationsCreateForm = () => {
    const router = useRouter()
    const { mutate: createOrganization, isPending } = useCreateOrganization()

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            defaultLanguage: 'en',
            defaultCurrency: 'USD',
            phone: '',
        },
    })

    useEffect(() => {
        const browserLanguage = navigator.language
        const matchedLanguage = SUPPORTED_LANGUAGES.find((language) => language.code === browserLanguage)?.code ?? 'en'
        form.setValue('defaultLanguage', matchedLanguage)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = async (data: FormSchema) => {
        try {
            await createOrganization({
                name: data.name,
                defaultLanguage: data.defaultLanguage,
                defaultCurrency: data.defaultCurrency,
                phone: data.phone,
                websiteUrl: data.websiteUrl,
            })

            toast.success('Organization created successfully')
            router.push(ROUTES.DASHBOARD.INDEX)
        } catch (error) {
            toast.error('Failed to create organization')
            logger.error(`[OrganizationsCreateForm] Failed to create organization`, { error })
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Form {...form}>
                <div className="flex flex-col gap-6">
                    <FormField
                        isRequired
                        label="Company name"
                        control={form.control}
                        name="name"
                        errorMessage={form.formState.errors.name?.message}
                        render={(field) => <Input {...field} placeholder="Acme Inc." />}
                    />

                    <FormField
                        isRequired
                        label="Phone"
                        control={form.control}
                        name="phone"
                        errorMessage={form.formState.errors.phone?.message}
                        render={(field) => <Input {...field} placeholder="+373 60 123 456" />}
                    />

                    <FormField
                        isRequired
                        label="Website URL"
                        control={form.control}
                        name="websiteUrl"
                        errorMessage={form.formState.errors.websiteUrl?.message}
                        render={(field) => <Input {...field} placeholder="https://acme.com" />}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            isRequired
                            label="Preferred language"
                            control={form.control}
                            name="defaultLanguage"
                            errorMessage={form.formState.errors.defaultLanguage?.message}
                            render={(field) => (
                                <Select
                                    placeholder="Select language"
                                    options={SUPPORTED_LANGUAGES.map((language) => ({
                                        label: language.name,
                                        value: language.code,
                                    }))}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />

                        <FormField
                            isRequired
                            label="Preferred currency"
                            control={form.control}
                            name="defaultCurrency"
                            errorMessage={form.formState.errors.defaultCurrency?.message}
                            render={(field) => (
                                <Select
                                    placeholder="Select currency"
                                    options={SUPPORTED_CURRENCIES.map((currency) => ({
                                        label: `${currency.code} (${currency.symbol})`,
                                        value: currency.code,
                                    }))}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>

                    <Button type="submit" isLoading={isPending}>
                        Next
                    </Button>
                </div>
            </Form>
        </form>
    )
}
