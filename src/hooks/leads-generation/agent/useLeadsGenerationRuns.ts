import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { LeadsGenerationAgentRun } from '~/services/leads-generation/model'
import { BaseResponse } from '~/types/response'

export const useLeadsGenerationRuns = (organizationId: string) => {
    return useQuery({
        queryKey: ['leads-generation-runs', organizationId],
        queryFn: () => fetch<BaseResponse<LeadsGenerationAgentRun[]>>('GET', `/organization/${organizationId}/leads-generation/agent/run`),
    })
}
