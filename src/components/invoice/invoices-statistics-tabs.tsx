import { ReactNode, useMemo } from 'react'

import { formatCurrency } from '~/lib/currency/format-currency'
import { cn } from '~/lib/shared/utils'
import { pluralize } from '~/lib/strings'
import { InvoicesStatistics } from '~/services/invoice/model'
import { Organization } from '~/services/organization/model'

import { BlurFade } from '../ui/blur-fade'
import { Card, CardContent } from '../ui/card'

interface Props {
    organization: Organization
    statistics: InvoicesStatistics
}

const getPaymentScoreColor = (score: number, forText: boolean = false) => {
    if (score === 0) return forText ? 'text-gray-500' : 'bg-gray-500'
    if (score >= 80) return forText ? 'text-green-500' : 'bg-green-500'
    if (score >= 50) return forText ? 'text-yellow-500' : 'bg-yellow-500'
    return 'bg-red-500'
}

export const InvoicesStatisticsTabs = ({ organization, statistics }: Props) => {
    const { total, overdue, paid } = statistics

    const paymentScoreTitle = useMemo(() => {
        const score = statistics.paymentScore ?? 0

        if (score === 0) return 'Unknown'
        if (score >= 80) return 'Good'
        if (score >= 50) return 'Average'
        return 'Bad'
    }, [statistics.paymentScore])

    const paymentScoreDescription = useMemo(() => {
        const score = statistics.paymentScore ?? 0

        if (score === 0) return 'No payment history yet'
        if (score >= 80) return 'Consistently paid on time'
        if (score >= 50) return 'Paying on time, but not consistently'
        return 'Paying late, or not at all'
    }, [statistics.paymentScore])

    const paymentScoreTitleClassName = useMemo(() => {
        const score = statistics.paymentScore ?? 0
        return getPaymentScoreColor(score, true)
    }, [statistics.paymentScore])

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Tab
                title={formatCurrency(total.amount, organization.defaultCurrency ?? 'USD')}
                subtitle="Open"
                description={
                    total.invoicesCount === 0 ? 'No invoices' : `${total.invoicesCount} ${pluralize('invoice', total.invoicesCount)}`
                }
            />

            <Tab
                title={formatCurrency(overdue.amount, organization.defaultCurrency ?? 'USD')}
                subtitle="Overdue"
                description={
                    overdue.invoicesCount === 0 ? 'No invoices' : `${overdue.invoicesCount} ${pluralize('invoice', overdue.invoicesCount)}`
                }
            />

            <Tab
                title={formatCurrency(paid.amount, organization.defaultCurrency ?? 'USD')}
                subtitle="Paid"
                description={paid.invoicesCount === 0 ? 'No invoices' : `${paid.invoicesCount} ${pluralize('invoice', paid.invoicesCount)}`}
            />

            <Tab
                title={paymentScoreTitle}
                titleClassName={paymentScoreTitleClassName}
                subtitle="Payment Score"
                description={paymentScoreDescription}
                addon={<PaymentScoreChart score={statistics.paymentScore} />}
            />
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
