import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/fetch'
import { OrganizationIntegrationInstagramConfiguration } from '~/services/integration/model'

type Payload = {
    integrationId: string
    payload: Partial<OrganizationIntegrationInstagramConfiguration>
}

export const useUpdateOrganizationIntegrationInstagram = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ integrationId, payload }: Payload) => {
            return fetch('PUT', `/organization/${organizationId}/integrations/${integrationId}/instagram`, payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization-integrations', organizationId] })
        },
    })
}
