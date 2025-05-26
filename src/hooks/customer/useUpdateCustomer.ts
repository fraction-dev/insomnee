import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { Customer, CustomerUpdatePayload } from '~/services/customer/model'
import { BaseResponse } from '~/types/response'

export const useUpdateCustomer = (organizationId: string, customerId?: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CustomerUpdatePayload) =>
            customerId
                ? fetch<BaseResponse<Customer>>('PUT', `/organization/${organizationId}/customers/${customerId}`, data)
                : Promise.resolve(null),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers', organizationId] })
        },
    })
}
