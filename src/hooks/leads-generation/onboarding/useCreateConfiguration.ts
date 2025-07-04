import { useMutation } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { LeadsGenerationAgentConfiguration, LeadsGenerationAgentOnboardingDirtyFormSchemaType } from '~/services/leads-generation/model'
import { BaseResponse } from '~/types/response'

export const useCreateConfiguration = (organizationId: string) => {
    return useMutation({
        mutationFn: (input: LeadsGenerationAgentOnboardingDirtyFormSchemaType) =>
            fetch<BaseResponse<LeadsGenerationAgentConfiguration>>(
                'POST',
                `/organization/${organizationId}/leads-generation/configuration`,
                input,
            ),
    })
}
