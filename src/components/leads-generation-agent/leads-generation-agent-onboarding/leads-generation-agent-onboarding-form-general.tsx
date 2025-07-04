import { useFormContext } from 'react-hook-form'

import { FormField } from '~/components/shared/form-field'
import { Select } from '~/components/shared/select'
import { Input } from '~/components/ui/input'
import { SeparatorWithText } from '~/components/ui/separator-with-text'
import { Textarea } from '~/components/ui/textarea'
import { COUNTRIES } from '~/consts/counties'
import { LeadsGenerationAgentOnboardingDirtyFormSchemaType } from '~/services/leads-generation/model'

export const LeadsGenerationAgentOnboardingFormGeneral = () => {
    const form = useFormContext<LeadsGenerationAgentOnboardingDirtyFormSchemaType>()

    return (
        <>
            <SeparatorWithText text="Basic Company Information" />

            <FormField
                isRequired
                label="Company name"
                control={form.control}
                name="companyName"
                render={(field) => <Input {...field} placeholder="Acme Inc." value={field.value as string} />}
                errorMessage={form.formState.errors.companyName?.message}
            />

            <FormField
                isRequired
                label="Company website"
                control={form.control}
                name="companyWebsite"
                render={(field) => <Input {...field} placeholder="https://www.acme.com" value={field.value as string} />}
                errorMessage={form.formState.errors.companyWebsite?.message}
            />

            <FormField
                isRequired
                label="Company solution"
                control={form.control}
                name="solution"
                render={(field) => (
                    <Textarea
                        {...field}
                        placeholder="We provide insurance policies to people, businesses, cars and pets."
                        value={field.value as string}
                        rows={7}
                        className="resize-none min-h-24 placeholder:text-sm"
                    />
                )}
                errorMessage={form.formState.errors.solution?.message}
            />

            <FormField
                isRequired
                label="Targeting country"
                control={form.control}
                name="targetCountry"
                render={(field) => (
                    <Select
                        {...field}
                        value={field.value as string}
                        options={COUNTRIES.map((country) => ({ label: country.name, value: country.code }))}
                        placeholder="Select a country"
                    />
                )}
                errorMessage={form.formState.errors.targetCountry?.message}
            />
        </>
    )
}
