import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { Customer } from '~/services/customer/model'
import { BaseResponse } from '~/types/response'

export const useCustomers = (organizationId: string) => {
    return useQuery({
        queryKey: ['customers', organizationId],
        queryFn: () => fetch<BaseResponse<Customer[]>>('GET', `/organization/${organizationId}/customers`),
    })
}
