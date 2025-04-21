import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'

export const useDeleteOrganizationTransactions = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (transactionIds: string[]) =>
            fetch('POST', API_ROUTES.ORGANIZATION_TRANSACTIONS.DELETE(organizationId), { transactionIds }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization-transactions'] })
            toast.success('Transactions deleted')
        },
    })
}
