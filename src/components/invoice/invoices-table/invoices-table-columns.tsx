import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'

import { UserCard } from '~/components/shared/user-card'
import { Checkbox } from '~/components/ui/checkbox'
import { formatCurrency } from '~/lib/currency/format-currency'
import { getReadableDateDiff } from '~/lib/date/date'
import { calculateInvoiceAmounts } from '~/lib/invoice/calculate-invoice-amounts'
import { Invoice } from '~/services/invoice/model'

import { InvoiceStatusBadge } from '../invoice-status-badge'

export const invoicesTableColumns: ColumnDef<Invoice>[] = [
    {
        id: 'select',
        size: 30,
        header: ({ table }) => (
            <div className="text-center">
                <Checkbox
                    className="cursor-pointer"
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    aria-label="Select all"
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="text-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    aria-label="Select row"
                    className="cursor-pointer"
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        header: 'Invoice No.',
        accessorKey: 'number',
    },
    {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
            const status = row.original.status

            return <InvoiceStatusBadge status={status} />
        },
    },
    {
        header: 'Due Date',
        accessorKey: 'dueDate',
        cell: ({ row }) => {
            const dueDate = row.original.dueDate

            return (
                <div className="flex flex-col gap-1">
                    <p className="text-sm">{dayjs(dueDate).format('MMM D, YYYY')}</p>
                    <p className="text-xs text-muted-foreground"> {getReadableDateDiff(dueDate)}</p>
                </div>
            )
        },
    },
    {
        header: 'Customer',
        accessorKey: 'customer',
        cell: ({ row }) => {
            const customer = row.original.customer

            return <UserCard name={customer?.name ?? customer?.email ?? ''} image={null} />
        },
    },
    {
        header: 'Issue Date',
        accessorKey: 'issueDate',
        cell: ({ row }) => {
            const issueDate = row.original.issueDate

            return <div>{dayjs(issueDate).format(row.original.dateFormat ?? 'DD/MM/YYYY')}</div>
        },
    },
    {
        accessorKey: 'amount',
        header: () => <p className="text-right">Amount</p>,
        cell: ({ row }) => {
            const { total } = calculateInvoiceAmounts(row.original)

            return <div className="text-right">{formatCurrency(total, row.original.currency ?? 'USD')}</div>
        },
    },
]
