import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { LeadsGenerationAgentConfiguration } from '~/services/leads-generation/model'
import { BaseResponse } from '~/types/response'

export const useLeadsGeneratingConfiguration = (organizationId: string) => {
    return useQuery({
        queryKey: ['leads-generating-configuration', organizationId],
        queryFn: () =>
            fetch<BaseResponse<LeadsGenerationAgentConfiguration[]>>(
                'GET',
                `/organization/${organizationId}/leads-generation/configuration`,
            ),
    })
}
