import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { InvoicesStatistics } from '~/services/invoice/model'
import { BaseResponse } from '~/types/response'

export const useInvoicesStatistics = (organizationId: string) => {
    return useQuery({
        queryKey: ['invoices-statistics', organizationId],
        queryFn: () => fetch<BaseResponse<InvoicesStatistics>>('GET', `/organization/${organizationId}/invoice/statistics`),
    })
}
