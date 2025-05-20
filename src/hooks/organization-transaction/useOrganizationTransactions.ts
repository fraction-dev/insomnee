import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/fetch'
import { OrganizationTransaction } from '~/services/organization-transaction/model'
import { BaseResponse } from '~/types/response'

export const useOrganizationTransactions = (organizationId: string) => {
    return useQuery<BaseResponse<OrganizationTransaction[]>>({
        queryKey: ['organization-transactions', organizationId],
        queryFn: () => fetch('GET', `/organization/${organizationId}/transaction`),
    })
}
