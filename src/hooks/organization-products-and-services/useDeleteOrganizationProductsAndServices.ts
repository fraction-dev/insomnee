import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/fetch'

export const useDeleteOrganizationProductsAndServices = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (ids: string[]) => fetch('DELETE', `/organization/${organizationId}/products-and-services?ids=${ids.join(',')}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization-products-and-services'] })
        },
    })
}
