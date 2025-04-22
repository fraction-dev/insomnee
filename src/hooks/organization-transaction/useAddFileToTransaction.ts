import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'

export const useAddFileToTransaction = (organizationId: string, transactionId: string | undefined) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (fileId: string) =>
            transactionId
                ? fetch('POST', API_ROUTES.ORGANIZATION_TRANSACTIONS.ADD_FILE(organizationId, transactionId), {
                      fileId,
                  })
                : Promise.resolve(null),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization-transactions'] })
        },
    })
}
