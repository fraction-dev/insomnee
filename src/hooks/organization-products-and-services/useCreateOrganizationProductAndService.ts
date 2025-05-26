import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { OrganizationProductsAndServices, OrganizationProductsAndServicesCreate } from '~/services/organization-products-and-services/model'
import { BaseResponse } from '~/types/response'

export const useCreateOrganizationProductAndService = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation<BaseResponse<OrganizationProductsAndServices>, Error, OrganizationProductsAndServicesCreate>({
        mutationFn: (data) => fetch('POST', `/organization/${organizationId}/products-and-services`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization-products-and-services'] })
        },
    })
}
