import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { TransactionUpdate } from '~/services/transaction/model'

export const useUpdateTransaction = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ transactionId, body }: { transactionId: string; body: TransactionUpdate }) =>
            fetch('PATCH', `/organization/${organizationId}/transaction/${transactionId}`, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions', organizationId] })
        },
    })
}
