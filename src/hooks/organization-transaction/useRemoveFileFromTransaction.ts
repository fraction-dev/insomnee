import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'

export const useRemoveFileFromTransaction = (organizationId: string, transactionId: string | undefined) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (fileId: string) =>
            transactionId
                ? fetch('DELETE', API_ROUTES.ORGANIZATION_TRANSACTIONS.REMOVE_FILE(organizationId, transactionId, fileId))
                : Promise.resolve(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization-transactions'] })
        },
    })
}
