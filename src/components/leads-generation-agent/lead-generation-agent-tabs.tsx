import { ReactNode } from 'react'

import { useLeadGenerationStatistics } from '~/hooks/leads-generation/statistics/useLeadGenerationStatistics'
import { formatDateToReadableString, formatSecondsToReadableTime } from '~/lib/date/date'
import { formatNumberToReadableString } from '~/lib/number/number'
import { cn } from '~/lib/shared/utils'

import { BlurFade } from '../ui/blur-fade'
import { Card, CardContent } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export const LeadGenerationAgentTabs = ({ organizationId }: { organizationId: string }) => {
    const { data: statistics, isLoading } = useLeadGenerationStatistics(organizationId)

    const tabs = [
        {
            title: formatNumberToReadableString(statistics?.data.totalInsights ?? 0),
            subtitle: 'Generated insights',
            description: `Total number of generated insights for your business since first configuration`,
        },
        {
            title: `~${formatSecondsToReadableTime(statistics?.data.totalExecutionTimeInSeconds ?? 0)}`,
            subtitle: 'Total execution time',
            description: 'Number of seconds spent on agent execution in the background',
        },
        {
            title: statistics?.data.lastRunAt ? formatDateToReadableString(statistics?.data.lastRunAt, { withHours: true }) : 'Never',
            subtitle: 'Last run',
            description: 'Date and time of the last run',
        },
        {
            title: !statistics?.data.successRatePercentage ? 'Unknown' : `${statistics?.data.successRatePercentage?.toString()}%`,
            subtitle: 'Success rate',
            description: 'Percentage of successful leads generated',
            addon: <PaymentScoreChart score={statistics?.data.successRatePercentage ?? 0} />,
        },
    ]

    if (isLoading) {
        return (
            <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-48 w-full" />
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            {tabs.map((tab) => (
                <Tab key={tab.title} {...tab} />
            ))}
        </div>
    )
}

const Tab = ({
    title,
    subtitle,
    description,
    addon,
    titleClassName,
}: {
    title: string
    subtitle: string
    description: string
    addon?: ReactNode
    titleClassName?: string
}) => {
    return (
        <Card>
            <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-12">
                    <div className="flex items-center gap-2">
                        <div className="size-1.5 bg-amber-600 rounded-full animate-pulse" />
                        <h3 className={cn('font-mono text-xl font-normal', titleClassName)}>{title}</h3>
                    </div>
                    {addon}
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-base text-neutral-800 dark:text-neutral-50 font-normal">{subtitle}</p>
                    <p className="text-sm text-muted-foreground font-light">{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}

const getPaymentScoreColor = (score: number, forText: boolean = false) => {
    if (score === 0) return forText ? 'text-gray-500' : 'bg-gray-500'
    if (score >= 80) return forText ? 'text-green-500' : 'bg-green-500'
    if (score >= 50) return forText ? 'text-yellow-500' : 'bg-yellow-500'
    return 'bg-red-500'
}

const PaymentScoreChart = ({ score }: { score: number }) => {
    const bars = 10

    const barsColors = getPaymentScoreColor(score)

    return (
        <div className="hidden sm:flex items-end gap-[6px]">
            {Array.from({ length: bars }).map((_, index) => {
                return (
                    <BlurFade key={index} delay={index * 0.01} className="relative">
                        <div
                            className={cn('w-1 relative z-10', barsColors)}
                            style={{
                                height: 27,
                            }}
                        />
                    </BlurFade>
                )
            })}
        </div>
    )
}
