import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'

export const useUpdateOrganizationLogo = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (logo: string) => fetch('PUT', `/organization/${organizationId}/logo`, { logo }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization', organizationId] })
        },
    })
}
