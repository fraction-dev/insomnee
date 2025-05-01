import { useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'
import { OrganizationIntegration } from '~/services/integration/model'
import { BaseResponse } from '~/types/response'

export const useOrganizationIntegrations = (organizationId: string) => {
    return useQuery<BaseResponse<OrganizationIntegration[]>>({
        queryKey: ['organization-integrations', organizationId],
        queryFn: () => fetch('GET', API_ROUTES.ORGANIZATION_INTEGRATIONS.INDEX(organizationId)),
    })
}
