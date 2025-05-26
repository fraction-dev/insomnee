import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'

export const useDeleteProductsAndServices = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (ids: string[]) => fetch('DELETE', `/organization/${organizationId}/products-and-services?ids=${ids.join(',')}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products-and-services', organizationId] })
        },
    })
}
