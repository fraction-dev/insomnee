import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { Transaction } from '~/services/transaction/model'
import { BaseResponse } from '~/types/response'

export const useTransactions = (organizationId: string) => {
    return useQuery<BaseResponse<Transaction[]>>({
        queryKey: ['transactions', organizationId],
        queryFn: () => fetch('GET', `/organization/${organizationId}/transaction`),
    })
}
