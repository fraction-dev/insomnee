import dayjs from 'dayjs'
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from 'recharts'

import { ChartContainer, ChartTooltip,ChartTooltipContent  } from '~/components/ui/chart'
import { Separator } from '~/components/ui/separator'
import { formatDateToReadableString } from '~/lib/date'
import { cn } from '~/lib/utils'
import { OverviewChartData } from '~/services/overview/model'

import { chartConfig } from './overview-chart-wrapper'

interface Props {
    data: OverviewChartData[]
}

export const OverviewChartMessagingAgentAnalytics = ({ data }: Props) => {
    const getTooltipLabel = (): Record<keyof typeof chartConfig, string> => {
        return {
            x: 'Responses',
            y: '',
        }
    }

    return (
        <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
            <LineChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <YAxis domain={[-2, 'dataMax + 3']} tick={false} axisLine={false} />
                <XAxis
                    tickFormatter={(value, index) => {
                        const year = data[index].year
                        const month = data[index].month
                        const day = data[index].day
                        return dayjs(`${year}-${month}-${day}`).format('DD MMM')
                    }}
                />
                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            hideLabel
                            className="w-[180px] rounded-xs p-4"
                            formatter={(value, name, payload) => (
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
                                            {value}
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground text-xs leading-normal">
                                        The number of responses from the messaging agent in your integrations.
                                    </p>

                                    <Separator />

                                    <p className="text-muted-foreground text-xs leading-normal">
                                        {formatDateToReadableString(
                                            dayjs(`${payload.payload.year}-${payload.payload.month}-${payload.payload.day}`).toDate(),
                                        )}
                                    </p>
                                </div>
                            )}
                        />
                    }
                />
                <Line
                    dataKey="x"
                    type="natural"
                    stroke="var(--color-x)"
                    strokeWidth={1}
                    dot={CustomDot}
                    activeDot={{
                        r: 2,
                    }}
                >
                    <LabelList
                        position="top"
                        offset={12}
                        className="fill-foreground"
                        fontSize={10}
                        formatter={(value: number) => (value > 0 ? value : '')}
                    />
                </Line>
            </LineChart>
        </ChartContainer>
    )
}

const CustomDot = ({ cx, cy, payload }: { cx: number; cy: number; payload: OverviewChartData }) => {
    if (payload.x === 0) return <circle cx={cx} cy={cy} r={0} />
    return <circle cx={cx} cy={cy} r={4} fill="var(--color-x)" />
}
