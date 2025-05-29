'use client'

import { useState } from 'react'

import { InvoiceSheet } from '~/components/invoice/invoice-sheet'
import { InvoicesHeader } from '~/components/invoice/invoices-header'
import { InvoicesStatisticsTabs } from '~/components/invoice/invoices-statistics-tabs'
import { InvoicesTable } from '~/components/invoice/invoices-table/invoices-table'
import { EmptyDataState } from '~/components/shared/empty-data-state'
import { Skeleton } from '~/components/ui/skeleton'
import { ROUTES } from '~/config/routes'
import { useInvoices } from '~/hooks/invoice/useInvoices'
import { useInvoicesStatistics } from '~/hooks/invoice/useInvoicesStatistics'
import { useSheet } from '~/hooks/shared/useSheet'
import { Invoice } from '~/services/invoice/model'
import { Organization } from '~/services/organization/model'

interface Props {
    organization: Organization
}

export const InvoicesView = ({ organization }: Props) => {
    const { data, isLoading: isInvoicesLoading } = useInvoices(organization.id)
    const { data: statisticsData, isLoading: isStatisticsLoading } = useInvoicesStatistics(organization.id)

    const statistics = statisticsData?.data ?? {
        total: { amount: 0, invoicesCount: 0 },
        overdue: { amount: 0, invoicesCount: 0 },
        paid: { amount: 0, invoicesCount: 0 },
        paymentScore: 0,
    }

    const isLoading = isInvoicesLoading || isStatisticsLoading

    const { id: invoiceId, stateType, isSheetOpen, handleCleanQueryParams } = useSheet('invoice')

    const [selectedRows, setSelectedRows] = useState<Invoice[]>([])

    const invoice = data?.data.find((invoice) => invoice.id === invoiceId)

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Skeleton className="h-44 w-full" />
                    <Skeleton className="h-44 w-full" />
                    <Skeleton className="h-44 w-full" />
                    <Skeleton className="h-44 w-full" />
                </div>

                <div className="flex items-center justify-end">
                    <Skeleton className="size-10" />
                </div>

                <Skeleton className="h-96" />
            </div>
        )
    }

    if (!isLoading && data?.data.length === 0) {
        return (
            <>
                <InvoicesStatisticsTabs organization={organization} statistics={statistics} />
                <EmptyDataState type="invoice" href={`${ROUTES.DASHBOARD.INVOICES(organization.id)}?isCreateNew=true`} />
                <InvoiceSheet
                    stateType={stateType}
                    invoice={invoice}
                    organizationId={organization.id}
                    isOpen={isSheetOpen}
                    onClose={handleCleanQueryParams}
                />
            </>
        )
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <InvoicesStatisticsTabs organization={organization} statistics={statistics} />
                <InvoicesHeader organizationId={organization.id} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
                <InvoicesTable
                    organizationId={organization.id}
                    invoices={data?.data ?? []}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                />
            </div>

            <InvoiceSheet
                stateType={stateType}
                invoice={invoice}
                organizationId={organization.id}
                isOpen={isSheetOpen}
                onClose={handleCleanQueryParams}
            />
        </>
    )
}
