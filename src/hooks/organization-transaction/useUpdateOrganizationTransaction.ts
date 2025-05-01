import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'
import { OrganizationTransactionUpdate } from '~/services/organization-transaction/model'

export const useUpdateOrganizationTransaction = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ transactionId, body }: { transactionId: string; body: OrganizationTransactionUpdate }) =>
            fetch('PATCH', API_ROUTES.ORGANIZATION_TRANSACTIONS.TRANSACTION(organizationId, transactionId), body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['organization-transactions', organizationId],
            })

            toast.success('Transaction updated successfully')
        },
    })
}
