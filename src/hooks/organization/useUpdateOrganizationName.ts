import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'

export const useUpdateOrganizationName = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (name: string) => fetch('PUT', `/organization/${organizationId}/name`, { name }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization', organizationId] })
        },
    })
}
