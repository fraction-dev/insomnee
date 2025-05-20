import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { fetch } from '~/lib/fetch'

export const useDeleteOrganizationTransactions = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (transactionIds: string[]) => fetch('POST', `/organization/${organizationId}/transaction/delete`, { transactionIds }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization-transactions'] })
            toast.success('Transactions deleted')
        },
    })
}
