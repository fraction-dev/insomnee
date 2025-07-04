import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { LeadsGenerationAgentRunStatus } from '~/services/leads-generation/model'

export const useRunLeadsGenerationAgent = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ configurationId, status }: { configurationId: string; status: LeadsGenerationAgentRunStatus }) =>
            fetch('POST', `/organization/${organizationId}/leads-generation/configuration/${configurationId}/run`, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leads-generation-runs', organizationId] })
        },
    })
}
