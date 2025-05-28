import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { Invoice } from '~/services/invoice/model'
import { BaseResponse } from '~/types/response'

export const useInvoices = (organizationId: string) => {
    return useQuery({
        queryKey: ['invoices', organizationId],
        queryFn: () => fetch<BaseResponse<Invoice[]>>('GET', `/organization/${organizationId}/invoice`),
    })
}
