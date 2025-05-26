import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { ProductAndService } from '~/services/product-and-service/model'
import { BaseResponse } from '~/types/response'

export const useProductsAndServices = (organizationId: string) => {
    return useQuery<BaseResponse<ProductAndService[]>, Error>({
        queryKey: ['products-and-services', organizationId],
        queryFn: () => fetch('GET', `/organization/${organizationId}/products-and-services`),
    })
}
