import { ColumnDef } from '@tanstack/react-table'
import { truncate } from 'lodash'

import { UserCard } from '~/components/shared/user-card'
import { Checkbox } from '~/components/ui/checkbox'
import { formatCurrency } from '~/lib/currency/format-currency'
import { formatDateToReadableString } from '~/lib/date/date'
import { cn } from '~/lib/shared/utils'
import { Transaction } from '~/services/transaction/model'
import { formatOrganizationTransactionCategoryType } from '~/services/transaction-category/lib/formatOrganizationTransactionCategoryType'
import { BASE_TRANSACTION_CATEGORY } from '~/services/transaction-category/model'

export const transactionsTableColumns: ColumnDef<Transaction>[] = [
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
        id: 'description',
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => truncate(row.original.description, { length: 35 }),
    },
    {
        id: 'amount',
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => formatCurrency(row.original.amount, row.original.currency),
    },
    {
        id: 'category',
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <div className={cn('h-2 w-2 rounded-xs')} style={{ backgroundColor: row.original.category.color || '#000000' }} />
                <span>{formatOrganizationTransactionCategoryType(row.original.category.type as BASE_TRANSACTION_CATEGORY)}</span>
            </div>
        ),
    },
    {
        id: 'assignedTo',
        accessorKey: 'assignedTo',
        header: 'Assigned To',
        cell: ({ row }) =>
            row.original.assignedTo && (
                <UserCard image={row.original.assignedTo?.image ?? null} name={row.original.assignedTo?.name ?? ''} />
            ),
    },
    {
        id: 'date',
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row }) => formatDateToReadableString(row.original.date),
    },
]
