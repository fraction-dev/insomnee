import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'

export const useArchiveCustomers = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (ids: string[]) => fetch('POST', `/organization/${organizationId}/customers/archive`, { ids }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
        },
    })
}
