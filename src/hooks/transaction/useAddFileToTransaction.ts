import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'

export const useAddFileToTransaction = (organizationId: string, transactionId: string | undefined) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (fileId: string) =>
            transactionId
                ? fetch('POST', `/organization/${organizationId}/transaction/${transactionId}/files`, {
                      fileId,
                  })
                : Promise.resolve(null),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization-transactions'] })
        },
    })
}
