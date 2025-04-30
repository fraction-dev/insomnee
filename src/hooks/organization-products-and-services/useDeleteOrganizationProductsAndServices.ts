import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'

export const useDeleteOrganizationProductsAndServices = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (ids: string[]) =>
            fetch('DELETE', `${API_ROUTES.ORGANIZATION_PRODUCTS_AND_SERVICES.INDEX(organizationId)}?ids=${ids.join(',')}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization-products-and-services'] })
        },
    })
}
