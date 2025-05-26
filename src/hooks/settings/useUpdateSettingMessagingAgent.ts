import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { UpdateMessagingAgentPayload } from '~/services/messaging-agent/model'

export const useUpdateMessagingAgent = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ agentId, data }: { agentId: string; data: UpdateMessagingAgentPayload }) =>
            fetch('PUT', `/organization/${organizationId}/settings/agents/messaging/${agentId}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['settings-agents', organizationId],
            })
        },
    })
}
