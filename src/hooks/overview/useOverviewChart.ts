import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { DateRange } from 'react-day-picker'

import { fetch } from '~/lib/shared/fetch'
import { OverviewChartData, OverviewChartType } from '~/services/overview/model'
import { BaseResponse } from '~/types/response'

export const useOverviewChart = (organizationId: string, currency: string, date: DateRange | undefined, chartType: OverviewChartType) => {
    const startDate = dayjs(date?.from).toDate().toISOString()
    const endDate = dayjs(date?.to).toDate().toISOString()

    return useQuery<BaseResponse<OverviewChartData[]>>({
        queryKey: ['overview-chart', organizationId, currency, date, chartType],
        queryFn: () =>
            fetch(
                'GET',
                `/organization/${organizationId}/overview/chart?currency=${currency}&startDate=${startDate}&endDate=${endDate}&chartType=${chartType}`,
            ),
    })
}
