import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { OrganizationProductsAndServicesUpdate } from '~/services/organization-products-and-services/model'

export const useUpdateOrganizationProductAndService = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ productAndServiceId, data }: { productAndServiceId: string; data: OrganizationProductsAndServicesUpdate }) =>
            fetch('PUT', `/organization/${organizationId}/products-and-services/${productAndServiceId}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization-products-and-services'] })
        },
    })
}
