import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { DateRange } from 'react-day-picker'
import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'
import { OverviewChartType, OverviewExpensesOverRevenueChartData } from '~/services/overview/model'
import { BaseResponse } from '~/types/response'

export const useOverviewChart = (organizationId: string, currency: string, date: DateRange | undefined, chartType: OverviewChartType) => {
    const startDate = dayjs(date?.from).toDate().toISOString()
    const endDate = dayjs(date?.to).toDate().toISOString()

    return useQuery<BaseResponse<OverviewExpensesOverRevenueChartData[]>>({
        queryKey: ['overview-chart', organizationId, currency, date, chartType],
        queryFn: () =>
            fetch(
                'GET',
                `${API_ROUTES.ORGANIZATION.OVERVIEW.CHART(organizationId)}?currency=${currency}&startDate=${startDate}&endDate=${endDate}&chartType=${chartType}`,
            ),
    })
}
