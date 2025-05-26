import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { OrganizationIntegration } from '~/services/integration/model'

export const useOrganizationIntegration = (organizationId: string, integrationId: string) => {
    return useQuery<OrganizationIntegration>({
        queryKey: ['organization-integration', organizationId, integrationId],
        queryFn: () => fetch('GET', `/organization/${organizationId}/integrations/${integrationId}`),
    })
}
