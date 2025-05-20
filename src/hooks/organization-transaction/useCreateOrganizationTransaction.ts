import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { fetch } from '~/lib/fetch'
import { OrganizationTransactionCreate } from '~/services/organization-transaction/model'

export const useCreateOrganizationTransaction = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (transaction: OrganizationTransactionCreate) =>
            fetch('POST', `/organization/${organizationId}/transaction`, transaction),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization-transactions', organizationId] })

            toast.success('Transaction created successfully')
        },
    })
}
