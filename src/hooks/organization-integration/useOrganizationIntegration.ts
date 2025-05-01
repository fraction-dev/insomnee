import { useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'
import { OrganizationIntegration } from '~/services/integration/model'

export const useOrganizationIntegration = (organizationId: string, integrationId: string) => {
    return useQuery<OrganizationIntegration>({
        queryKey: ['organization-integration', organizationId, integrationId],
        queryFn: () => fetch('GET', API_ROUTES.ORGANIZATION_INTEGRATIONS.GET(organizationId, integrationId)),
    })
}
