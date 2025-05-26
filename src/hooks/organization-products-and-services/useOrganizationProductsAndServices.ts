import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { OrganizationProductsAndServices } from '~/services/organization-products-and-services/model'
import { BaseResponse } from '~/types/response'

export const useOrganizationProductsAndServices = (organizationId: string) => {
    return useQuery<BaseResponse<OrganizationProductsAndServices[]>, Error>({
        queryKey: ['organization-products-and-services', organizationId],
        queryFn: () => fetch('GET', `/organization/${organizationId}/products-and-services`),
    })
}
