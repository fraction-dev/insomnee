import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { CustomerCreatePayload } from '~/services/customer/model'

export const useCreateCustomer = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CustomerCreatePayload) => fetch('POST', `/organization/${organizationId}/customers`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers', organizationId] })
        },
    })
}
