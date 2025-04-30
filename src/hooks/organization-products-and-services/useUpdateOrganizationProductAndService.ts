import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'
import { OrganizationProductsAndServicesUpdate } from '~/services/organization-products-and-services/model'

export const useUpdateOrganizationProductAndService = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ productAndServiceId, data }: { productAndServiceId: string; data: OrganizationProductsAndServicesUpdate }) =>
            fetch('PUT', API_ROUTES.ORGANIZATION_PRODUCTS_AND_SERVICES.PRODUCT_AND_SERVICE(organizationId, productAndServiceId), data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization-products-and-services'] })
        },
    })
}
