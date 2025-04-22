import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'

export const useUpdateOrganizationName = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (name: string) => fetch('PUT', API_ROUTES.ORGANIZATION.UPDATE_NAME(organizationId), { name }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization', organizationId] })
        },
    })
}
