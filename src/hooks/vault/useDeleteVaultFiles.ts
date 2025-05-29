import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'

export const useDeleteVaultFiles = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (ids: string[]) => {
            const query = new URLSearchParams()
            query.set('ids', ids.join(','))

            return fetch('DELETE', `/organization/${organizationId}/vault?${query.toString()}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vault-files', organizationId] })
        },
    })
}
