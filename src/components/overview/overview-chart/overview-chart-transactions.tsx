import dayjs from 'dayjs'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '~/components/ui/chart'
import { Separator } from '~/components/ui/separator'
import { formatCurrency } from '~/lib/currency/format-currency'
import { cn } from '~/lib/shared/utils'
import { OverviewChartData } from '~/services/overview/model'

import { chartConfig } from './overview-chart-wrapper'

interface Props {
    data: OverviewChartData[]
    currency: string
}

export const OverviewChartTransactions = ({ data, currency }: Props) => {
    const barSize = data.length <= 5 ? 100 : 60

    const getTooltipLabel = (): Record<keyof typeof chartConfig, string> => {
        return {
            x: 'Revenue',
            y: 'Expenses',
        }
    }

    return (
        <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
            <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(index: number) => {
                        const month = data[index].month
                        const year = data[index].year
                        return `${month} ${year}`
                    }}
                />
                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            hideLabel
                            className="w-[250px] rounded-xs p-4"
                            formatter={(value, name, payload) => {
                                return (
                                    <div className="flex flex-col gap-2 w-full">
                                        <div className="flex items-center justify-between gap-12">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={cn('size-2 rounded-xs', {
                                                        'bg-black': name === 'y',
                                                        'bg-neutral-400': name === 'x',
                                                    })}
                                                />

                                                {getTooltipLabel()[name as keyof typeof chartConfig]}
                                            </div>

                                            <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                {formatCurrency(value as number, currency)}
                                            </div>
                                        </div>

                                        {name === 'y' && (
                                            <>
                                                <Separator />

                                                <p className="text-muted-foreground text-xs leading-normal">
                                                    {dayjs(`${payload.payload.year}-${payload.payload.month}`).format('MMMM YYYY')}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                )
                            }}
                        />
                    }
                />
                <Bar dataKey="x" fill="var(--color-x)" radius={1} barSize={barSize} />
                <Bar dataKey="y" fill="var(--color-y)" radius={1} barSize={barSize} />
            </BarChart>
        </ChartContainer>
    )
}
