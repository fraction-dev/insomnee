import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'
import { OrganizationProductsAndServices, OrganizationProductsAndServicesCreate } from '~/services/organization-products-and-services/model'
import { BaseResponse } from '~/types/response'

export const useCreateOrganizationProductAndService = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation<BaseResponse<OrganizationProductsAndServices>, Error, OrganizationProductsAndServicesCreate>({
        mutationFn: (data) => fetch('POST', API_ROUTES.ORGANIZATION_PRODUCTS_AND_SERVICES.INDEX(organizationId), data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization-products-and-services'] })
        },
    })
}
