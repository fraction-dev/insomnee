import dayjs from 'dayjs'
import { ReactNode } from 'react'

import { formatCurrency } from '~/lib/currency/format-currency'
import { OverviewStatistics } from '~/services/overview/model'

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

interface Props {
    statistics: OverviewStatistics
    currency: string
    startDate: Date
    endDate: Date
}

export const OverviewCards = ({ statistics, currency, startDate, endDate }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <OverviewCard
                title="Messaging agent responses"
                value={statistics.messagingAgentResponsesCount}
                description="Statistics based on the number of messages sent to the messaging agent"
            />
            <OverviewCard
                title="Total revenue"
                value={formatCurrency(statistics.transactionsRevenue, currency)}
                description={`Your total revenue in transactions section for the period ${dayjs(startDate).format('DD.MM.YYYY')} - ${dayjs(endDate).format('DD.MM.YYYY')}`}
            />
            <OverviewCard
                title="Total expenses"
                value={formatCurrency(statistics.transactionsExpenses, currency)}
                description={`Your total expenses in transactions section for the period ${dayjs(startDate).format('DD.MM.YYYY')} - ${dayjs(endDate).format('DD.MM.YYYY')}`}
            />
            <OverviewCard
                title="Total products & services"
                value={statistics.productsAndServicesCount}
                description="Count of items in products & services section which are available for analytics and agents"
            />
        </div>
    )
}

const OverviewCard = ({
    title,
    value,
    description,
    footerActions,
}: {
    title: string
    value: string | number
    description?: string
    footerActions?: ReactNode
}) => {
    return (
        <Card>
            <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-mono text-default font-light">{value}</CardTitle>
                <CardDescription className="text-sm text-default text-neutral-600 dark:text-neutral-50 font-normal">
                    {title}
                </CardDescription>
                {description && (
                    <CardDescription className="text-xs text-default text-neutral-400 dark:text-neutral-300 font-normal leading-normal">
                        {description}
                    </CardDescription>
                )}
            </CardHeader>
            {footerActions && <CardFooter>{footerActions}</CardFooter>}
        </Card>
    )
}
