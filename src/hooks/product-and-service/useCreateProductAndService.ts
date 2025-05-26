import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { ProductAndService, ProductAndServiceCreate } from '~/services/product-and-service/model'
import { BaseResponse } from '~/types/response'

export const useCreateProductAndService = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation<BaseResponse<ProductAndService>, Error, ProductAndServiceCreate>({
        mutationFn: (data) => fetch('POST', `/organization/${organizationId}/products-and-services`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products-and-services', organizationId] })
        },
    })
}
