import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { TransactionCreate } from '~/services/transaction/model'

export const useCreateTransaction = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (transaction: TransactionCreate) => fetch('POST', `/organization/${organizationId}/transaction`, transaction),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions', organizationId] })
        },
    })
}
