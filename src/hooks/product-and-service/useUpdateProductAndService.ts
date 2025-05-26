import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { ProductAndServiceUpdate } from '~/services/product-and-service/model'

export const useUpdateProductAndService = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ productAndServiceId, data }: { productAndServiceId: string; data: ProductAndServiceUpdate }) =>
            fetch('PUT', `/organization/${organizationId}/products-and-services/${productAndServiceId}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products-and-services', organizationId] })
        },
    })
}
