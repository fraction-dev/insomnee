import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'

export const useUpdateOrganizationLogo = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (logo: string) => fetch('PUT', API_ROUTES.ORGANIZATION.UPDATE_LOGO(organizationId), { logo }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization', organizationId] })
        },
    })
}
