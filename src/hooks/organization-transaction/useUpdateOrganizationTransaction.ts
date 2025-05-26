import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { fetch } from '~/lib/shared/fetch'
import { OrganizationTransactionUpdate } from '~/services/organization-transaction/model'

export const useUpdateOrganizationTransaction = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ transactionId, body }: { transactionId: string; body: OrganizationTransactionUpdate }) =>
            fetch('PATCH', `/organization/${organizationId}/transaction/${transactionId}`, body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['organization-transactions', organizationId],
            })

            toast.success('Transaction updated successfully')
        },
    })
}
