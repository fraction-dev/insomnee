import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { LeadsGenerationAgentStatistics } from '~/services/leads-generation/model'
import { BaseResponse } from '~/types/response'

export const useLeadGenerationStatistics = (organizationId: string) => {
    return useQuery({
        queryKey: ['leads-generation-statistics', organizationId],
        queryFn: () =>
            fetch<BaseResponse<LeadsGenerationAgentStatistics>>('GET', `/organization/${organizationId}/leads-generation/statistics`),
    })
}
