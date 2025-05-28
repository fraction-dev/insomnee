import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { Invoice, InvoiceCreatePayload } from '~/services/invoice/model'
import { BaseResponse } from '~/types/response'

export const useCreateInvoice = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: InvoiceCreatePayload) => fetch<BaseResponse<Invoice>>('POST', `/organization/${organizationId}/invoice`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices', organizationId] })
            queryClient.invalidateQueries({ queryKey: ['invoices-statistics', organizationId] })
        },
    })
}
