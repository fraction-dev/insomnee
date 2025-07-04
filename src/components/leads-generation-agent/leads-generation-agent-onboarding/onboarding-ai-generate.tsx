import { SparklesIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Button } from '~/components/ui/button'
import { Hint } from '~/components/ui/hint'
import { useGenerateOnboardingData } from '~/hooks/leads-generation/onboarding/useGenerateOnboardingData'
import { LeadsGenerationAgentOnboardingFormSchemaType } from '~/services/leads-generation/model'

export const OnboardingAIGenerate = ({ organizationId }: { organizationId: string }) => {
    const { mutate, isPending } = useGenerateOnboardingData(organizationId)
    const form = useFormContext<LeadsGenerationAgentOnboardingFormSchemaType>()

    const websiteUrl = form.watch('companyWebsite')

    const handleGenerateOnboardingData = () => {
        if (!websiteUrl) return
        mutate(websiteUrl, {
            onSuccess: (data) => {
                form.reset({
                    ...form.getValues(),
                    countries: data.data.countries,
                    decisionMakers: data.data.decisionMakers,
                    idealCustomers: data.data.idealCustomers,
                    leadSignals: data.data.leadSignals,
                    newsFramework: data.data.newsFramework,
                    icpCompanySizeRange: data.data.icpCompanySizeRange,
                    icpIndustryVertical: data.data.icpIndustryVertical,
                    icpAnnualRevenue: data.data.icpAnnualRevenue,
                    icpHqLocation: data.data.icpHqLocation,
                    icpPhysicalPresence: data.data.icpPhysicalPresence,
                    solution: data.data.solution,
                })
            },
        })
    }

    return (
        <div className="flex justify-end">
            <Hint content="Fill the form using AI">
                <Button
                    type="button"
                    isLoading={isPending}
                    variant="outline"
                    size="icon"
                    disabled={!websiteUrl}
                    onClick={handleGenerateOnboardingData}
                >
                    <SparklesIcon className="size-4" />
                </Button>
            </Hint>
        </div>
    )
}
