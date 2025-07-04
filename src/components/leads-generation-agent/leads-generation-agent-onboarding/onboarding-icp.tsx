import { useFormContext } from 'react-hook-form'

import { FormField } from '~/components/shared/form-field'
import { Select } from '~/components/shared/select'
import { MultiSelect } from '~/components/ui/multi-select'
import { SeparatorWithText } from '~/components/ui/separator-with-text'
import { COUNTRIES } from '~/consts/counties'
import {
    ICP_ANNUAL_REVENUE,
    ICP_COMPANY_SIZE_RANGES,
    ICP_DECISION_MAKERS,
    ICP_INDUSTRY_VERTICALS,
} from '~/services/leads-generation/consts/icp'
import {
    getReadableICPCompanySizeRangeList,
    getReadableICPDecisionMakersList,
    getReadableICPIndustryVerticalList,
    getReadableICPRevenueList,
} from '~/services/leads-generation/lib/formatIcp'
import { LeadsGenerationAgentOnboardingFormSchemaType } from '~/services/leads-generation/model'

export const OnboardingICP = () => {
    const form = useFormContext<LeadsGenerationAgentOnboardingFormSchemaType>()

    return (
        <>
            <SeparatorWithText text="Ideal Customer Profile" />

            <div className="grid grid-cols-2 gap-4 items-start">
                <FormField
                    isRequired
                    label="Geographic Targeting"
                    description="What countries should we focus our lead generation efforts on?"
                    control={form.control}
                    name="icpHqLocation"
                    render={(field) => (
                        <Select
                            {...field}
                            withSearch
                            value={form.watch('countries')[0] ?? ''}
                            options={COUNTRIES.map((country) => ({ label: country.name, value: country.name }))}
                        />
                    )}
                    errorMessage={form.formState.errors.icpHqLocation?.message}
                />

                <FormField
                    isRequired
                    label="Physical Presence Requirements"
                    description="Does your ideal customer need to have a physical office/presence in specific locations?"
                    control={form.control}
                    name="icpPhysicalPresence"
                    render={(field) => (
                        <Select
                            {...field}
                            value={String(field.value)}
                            options={[
                                { label: 'Yes', value: 'true' },
                                { label: 'No', value: 'false' },
                            ]}
                            onChange={(value) => form.setValue('icpPhysicalPresence', value === 'true')}
                        />
                    )}
                    errorMessage={form.formState.errors.icpPhysicalPresence?.message}
                />

                <FormField
                    isRequired
                    label="Annual Revenue"
                    description="What annual revenue ranges do your ideal customers typically have? (Select all that apply)"
                    control={form.control}
                    name="icpAnnualRevenue"
                    render={(field) => (
                        <MultiSelect
                            {...field}
                            value={field.value as string[]}
                            options={getReadableICPRevenueList()}
                            onValueChange={(value) => form.setValue('icpAnnualRevenue', value as (typeof ICP_ANNUAL_REVENUE)[number][])}
                        />
                    )}
                    errorMessage={form.formState.errors.icpAnnualRevenue?.message}
                />

                <FormField
                    isRequired
                    label="Decision Makers"
                    description="Who are the typical decision makers you need to reach at target companies?"
                    control={form.control}
                    name="decisionMakers"
                    render={(field) => (
                        <MultiSelect
                            {...field}
                            value={field.value as string[]}
                            options={getReadableICPDecisionMakersList()}
                            onValueChange={(value) => form.setValue('decisionMakers', value as (typeof ICP_DECISION_MAKERS)[number][])}
                        />
                    )}
                    errorMessage={form.formState.errors.decisionMakers?.message}
                />

                <FormField
                    isRequired
                    label="Company Sizes"
                    description="What is the typical size of the companies you're targeting? (Select all that apply)"
                    control={form.control}
                    name="icpCompanySizeRange"
                    render={(field) => (
                        <MultiSelect
                            {...field}
                            value={field.value as string[]}
                            options={getReadableICPCompanySizeRangeList()}
                            onValueChange={(value) =>
                                form.setValue('icpCompanySizeRange', value as (typeof ICP_COMPANY_SIZE_RANGES)[number][])
                            }
                        />
                    )}
                    errorMessage={form.formState.errors.icpCompanySizeRange?.message}
                />

                <FormField
                    isRequired
                    label="Industry Vertical"
                    description="What industries do your ideal customers typically belong to? (Select all that apply)"
                    control={form.control}
                    name="icpIndustryVertical"
                    render={(field) => (
                        <MultiSelect
                            {...field}
                            value={field.value as string[]}
                            options={getReadableICPIndustryVerticalList()}
                            onValueChange={(value) =>
                                form.setValue('icpIndustryVertical', value as (typeof ICP_INDUSTRY_VERTICALS)[number][])
                            }
                        />
                    )}
                    errorMessage={form.formState.errors.icpIndustryVertical?.message}
                />
            </div>
        </>
    )
}
