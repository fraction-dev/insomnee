import { toLower, upperFirst } from 'lodash'
import { ReactNode } from 'react'

import { Card, CardContent } from '~/components/ui/card'
import { formatNumberToReadableString } from '~/lib/number/number'
import { cn } from '~/lib/shared/utils'
import { LeadsGenerationAgentRun } from '~/services/leads-generation/model'

export const RunTabs = ({ run }: { run: LeadsGenerationAgentRun | null }) => {
    if (!run) return null

    const tabs = [
        {
            title: formatNumberToReadableString(run.insights?.length ?? 0),
            description: 'Total insights count based on your run configuration',
            subtitle: 'Insights',
        },
        {
            title: formatNumberToReadableString(run.newsArticles?.length ?? 0),
            description: 'Total news articles count based on your run configuration',
            subtitle: 'News articles',
        },
        {
            title: (
                <p
                    className={cn('font-medium', {
                        'text-emerald-700': run.status === 'COMPLETED',
                        'text-rose-700': run.status === 'FAILED',
                        'text-amber-700': run.status === 'PENDING',
                    })}
                >
                    {upperFirst(toLower(run.status))}
                </p>
            ),
            subtitle: 'Status',
            description: 'Status of the run',
        },
        {
            title: `${run.executionTimeInSeconds}s`,
            subtitle: 'Execution time',
            description: 'Time taken to complete the run',
        },
    ]

    return (
        <div className="grid grid-cols-4 gap-6">
            {tabs.map((tab, index) => (
                <Tab key={index} title={tab.title} subtitle={tab.subtitle} description={tab.description} />
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
    title: string | ReactNode
    subtitle: string
    description: string
    addon?: ReactNode
    titleClassName?: string
}) => {
    return (
        <Card>
            <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-12">
                    <h3 className={cn('font-mono text-xl font-normal', titleClassName)}>{title}</h3>
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
