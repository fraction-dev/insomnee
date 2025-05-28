import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'

export const useDeleteInvoices = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (ids: string[]) => fetch('POST', `/organization/${organizationId}/invoice/delete`, { ids }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] })
            queryClient.invalidateQueries({ queryKey: ['invoices-statistics', organizationId] })
        },
    })
}
