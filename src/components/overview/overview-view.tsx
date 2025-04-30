'use client'

import dayjs from 'dayjs'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useOverviewChart } from '~/hooks/overview/useOverviewChart'
import { useOverviewStatistics } from '~/hooks/overview/useOverviewStatistics'
import { Organization } from '~/services/organization/model'
import { OverviewChartType } from '~/services/overview/model'
import { Skeleton } from '../ui/skeleton'
import { OverviewCards } from './overview-cards'
import { OverviewChartWrapper } from './overview-chart/overview-chart-wrapper'
import { OverviewHeader } from './overview-header'
import { OverviewLoading } from './overview-loading'

interface Props {
    organization: Organization
}

export const OverviewView = ({ organization }: Props) => {
    const [currency, setCurrency] = useState<string>(organization.defaultCurrency)
    const [date, setDate] = useState<DateRange | undefined>({
        from: dayjs().subtract(7, 'days').toDate(),
        to: dayjs().toDate(),
    })
    const [selectedChart, setSelectedChart] = useState<OverviewChartType>('expenses-over-revenue')

    const startDate = dayjs(date?.from).toDate()
    const endDate = dayjs(date?.to).toDate()

    const { data, isLoading } = useOverviewStatistics(organization.id, currency, date)
    const { data: chartData, isLoading: isChartLoading } = useOverviewChart(organization.id, currency, date, selectedChart)

    if (isLoading) {
        return <OverviewLoading />
    }

    return (
        <div className="flex flex-col gap-4">
            <OverviewHeader currency={currency} date={date} onCurrencyChange={setCurrency} onDateChange={setDate} />

            {data?.data && <OverviewCards statistics={data?.data} currency={currency} startDate={startDate} endDate={endDate} />}

            {isChartLoading && <Skeleton className="h-[300px]" />}
            {!isChartLoading && chartData?.data && (
                <OverviewChartWrapper
                    currency={currency}
                    startDate={startDate}
                    endDate={endDate}
                    data={chartData?.data}
                    selectedChart={selectedChart}
                    onSelectedChartChange={setSelectedChart}
                />
            )}
        </div>
    )
}
