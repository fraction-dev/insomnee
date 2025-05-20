import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/fetch'

export const useRemoveFileFromTransaction = (organizationId: string, transactionId: string | undefined) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (fileId: string) =>
            transactionId
                ? fetch('DELETE', `/organization/${organizationId}/transaction/${transactionId}/files/${fileId}`)
                : Promise.resolve(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization-transactions'] })
        },
    })
}
