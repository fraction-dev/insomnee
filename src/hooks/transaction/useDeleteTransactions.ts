import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'

export const useDeleteTransactions = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (transactionIds: string[]) => fetch('POST', `/organization/${organizationId}/transaction/delete`, { transactionIds }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions', organizationId] })
        },
    })
}
