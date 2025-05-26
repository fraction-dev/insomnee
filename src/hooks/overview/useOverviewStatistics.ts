import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { DateRange } from 'react-day-picker'

import { fetch } from '~/lib/shared/fetch'
import { OverviewStatistics } from '~/services/overview/model'
import { BaseResponse } from '~/types/response'

export const useOverviewStatistics = (organizationId: string, currency: string, date: DateRange | undefined) => {
    const startDate = dayjs(date?.from).toDate().toISOString()
    const endDate = dayjs(date?.to).toDate().toISOString()

    return useQuery<BaseResponse<OverviewStatistics>>({
        queryKey: ['overview-statistics', organizationId, currency, date],
        queryFn: () =>
            fetch('GET', `/organization/${organizationId}/overview?currency=${currency}&startDate=${startDate}&endDate=${endDate}`),
    })
}
