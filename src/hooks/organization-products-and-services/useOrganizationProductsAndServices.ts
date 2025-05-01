import { useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'
import { OrganizationProductsAndServices } from '~/services/organization-products-and-services/model'
import { BaseResponse } from '~/types/response'

export const useOrganizationProductsAndServices = (organizationId: string) => {
    return useQuery<BaseResponse<OrganizationProductsAndServices[]>, Error>({
        queryKey: ['organization-products-and-services', organizationId],
        queryFn: () => fetch('GET', API_ROUTES.ORGANIZATION_PRODUCTS_AND_SERVICES.INDEX(organizationId)),
    })
}
