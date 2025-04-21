import { useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'
import { OrganizationTransaction } from '~/services/organization-transaction/model'
import { BaseResponse } from '~/types/response'

export const useOrganizationTransactions = (organizationId: string) => {
    return useQuery<BaseResponse<OrganizationTransaction[]>>({
        queryKey: ['organization-transactions', organizationId],
        queryFn: () => fetch('GET', API_ROUTES.ORGANIZATION_TRANSACTIONS.INDEX(organizationId)),
    })
}
