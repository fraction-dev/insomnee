import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { Invoice, InvoiceUpdatePayload } from '~/services/invoice/model'
import { BaseResponse } from '~/types/response'

export const useUpdateInvoice = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload: InvoiceUpdatePayload) =>
            fetch<BaseResponse<Invoice>>('PATCH', `/organization/${organizationId}/invoice/${payload.id}`, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices', organizationId] })
            queryClient.invalidateQueries({ queryKey: ['invoices-statistics', organizationId] })
        },
    })
}
