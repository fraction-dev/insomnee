import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'
import { OrganizationTransactionCreate } from '~/services/organization-transaction/model'

export const useCreateOrganizationTransaction = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (transaction: OrganizationTransactionCreate) =>
            fetch('POST', API_ROUTES.ORGANIZATION_TRANSACTIONS.INDEX(organizationId), transaction),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization-transactions', organizationId] })

            toast.success('Transaction created successfully')
        },
    })
}
