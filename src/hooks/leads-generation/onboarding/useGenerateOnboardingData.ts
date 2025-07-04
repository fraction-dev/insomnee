import { useMutation } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { LeadsGenerationAgentOnboardingFormSchemaType } from '~/services/leads-generation/model'
import { BaseResponse } from '~/types/response'

export const useGenerateOnboardingData = (organizationId: string) => {
    return useMutation({
        mutationFn: (websiteUrl: string) =>
            fetch<BaseResponse<LeadsGenerationAgentOnboardingFormSchemaType>>(
                'POST',
                `/organization/${organizationId}/leads-generation/onboarding/generate`,
                { websiteUrl },
            ),
    })
}
