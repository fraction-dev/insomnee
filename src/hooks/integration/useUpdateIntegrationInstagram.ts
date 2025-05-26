import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { IntegrationInstagramConfiguration } from '~/services/integration/model'

type Payload = {
    integrationId: string
    payload: Partial<IntegrationInstagramConfiguration>
}

export const useUpdateIntegrationInstagram = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ integrationId, payload }: Payload) => {
            return fetch('PUT', `/organization/${organizationId}/integrations/${integrationId}/instagram`, payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['integrations', organizationId] })
        },
    })
}
