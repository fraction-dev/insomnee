import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { UpdateOrganizationMessagingAgentPayload } from '~/services/organization-messaging-agent/model'

export const useUpdateMessagingAgent = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ agentId, data }: { agentId: string; data: UpdateOrganizationMessagingAgentPayload }) =>
            fetch('PUT', `/organization/${organizationId}/settings/agents/messaging/${agentId}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['settings-agents', organizationId],
            })
        },
    })
}
