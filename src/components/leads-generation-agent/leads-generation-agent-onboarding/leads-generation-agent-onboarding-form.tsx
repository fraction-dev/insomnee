import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '~/components/ui/button'
import { Form } from '~/components/ui/form'
import { useCreateConfiguration } from '~/hooks/leads-generation/onboarding/useCreateConfiguration'
import { useOrganization } from '~/hooks/organization/useOrganization'
import {
    LeadsGenerationAgentOnboardingDirtyFormSchema,
    LeadsGenerationAgentOnboardingDirtyFormSchemaType,
} from '~/services/leads-generation/model'

import { LeadsGenerationAgentOnboardingFormGeneral } from './leads-generation-agent-onboarding-form-general'

export const LeadsGenerationAgentOnboardingForm = ({ organizationId }: { organizationId: string }) => {
    const { data: organization } = useOrganization(organizationId)
    const { mutate, isPending } = useCreateConfiguration(organizationId)

    const form = useForm<LeadsGenerationAgentOnboardingDirtyFormSchemaType>({
        resolver: zodResolver(LeadsGenerationAgentOnboardingDirtyFormSchema),
        defaultValues: {
            companyName: organization?.data?.name ?? '',
            companyWebsite: organization?.data?.websiteUrl ?? '',
            solution: '',
            targetCountry: '',
        },
    })

    const onSubmit = async (data: LeadsGenerationAgentOnboardingDirtyFormSchemaType) => {
        mutate(data, {
            onSuccess: () => {
                toast.success('Leads generation agent onboarding submitted successfully')
            },
            onError: () => {
                toast.error('Failed to submit leads generation agent onboarding')
            },
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 relative h-full pb-16">
                    <LeadsGenerationAgentOnboardingFormGeneral />
                    {/* <OnboardingAIGenerate organizationId={organizationId} /> */}
                    {/* <OnboardingICP /> */}
                    {/* <LeadsGenerationAgentOnboardingFormJobFrameworks /> */}
                    {/* <LeadsGenerationAgentOnboardingFormNewsFrameworks /> */}
                    {/* <Separator /> */}
                    <Button type="submit" isLoading={isPending} className="w-full absolute bottom-0 right-0">
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    )
}
