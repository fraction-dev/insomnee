import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'
import { UpdateOrganizationMessagingAgentPayload } from '~/services/organization-messaging-agent/model'

export const useUpdateMessagingAgent = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ agentId, data }: { agentId: string; data: UpdateOrganizationMessagingAgentPayload }) =>
            fetch('PUT', API_ROUTES.ORGANIZATION.SETTINGS.MESSAGING_AGENT.UPDATE(organizationId, agentId), data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['settings-agents', organizationId],
            })
        },
    })
}
