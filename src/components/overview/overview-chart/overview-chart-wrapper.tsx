import { ChevronDownIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { ChartConfig } from '~/components/ui/chart'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { formatDateToReadableString } from '~/lib/date'
import { OverviewChartData, OverviewChartType } from '~/services/overview/model'
import { OverviewChartMessagingAgentAnalytics } from './overview-chart-messaging-agent-analytics'
import { OverviewChartTransactions } from './overview-chart-transactions'

export const chartConfig = {
    x: { label: '', color: 'hsl(0 0% 50%)' },
    y: { label: '', color: 'hsl(0 0% 0%)' },
} satisfies ChartConfig

const CHART_TYPES: OverviewChartType[] = ['expenses-over-revenue', 'messaging-agent-statistics']

interface Props {
    startDate: Date
    endDate: Date
    data: OverviewChartData[]
    selectedChart: OverviewChartType
    currency: string
    onSelectedChartChange: (chart: OverviewChartType) => void
}

export const OverviewChartWrapper = ({ startDate, endDate, data, selectedChart, currency, onSelectedChartChange }: Props) => {
    const titlesMapping: Record<OverviewChartType, string> = {
        'expenses-over-revenue': 'Expenses over revenue',
        'messaging-agent-statistics': 'Messaging agent statistics',
    }

    return (
        <Card>
            <CardHeader className="space-y-3 flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <CardTitle className="font-medium flex items-center">
                        <p>{titlesMapping[selectedChart]}</p>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="link" size="icon">
                                    <ChevronDownIcon className="size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {CHART_TYPES.map((chartType) => (
                                    <DropdownMenuItem key={chartType} onClick={() => onSelectedChartChange(chartType)}>
                                        <span className="font-normal">{titlesMapping[chartType]}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardTitle>
                    <CardDescription className="text-xs">
                        {formatDateToReadableString(startDate)} - {formatDateToReadableString(endDate)}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                {selectedChart === 'expenses-over-revenue' ? (
                    <OverviewChartTransactions data={data} currency={currency} />
                ) : (
                    <OverviewChartMessagingAgentAnalytics data={data} />
                )}
            </CardContent>
        </Card>
    )
}
