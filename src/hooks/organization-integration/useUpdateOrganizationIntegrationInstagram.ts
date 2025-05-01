import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_ROUTES } from '~/config/api-routes'
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
            return fetch('PUT', API_ROUTES.ORGANIZATION_INTEGRATIONS.INSTAGRAM.UPDATE_CONFIGURATION(organizationId, integrationId), payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization-integrations', organizationId] })
        },
    })
}
