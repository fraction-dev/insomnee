import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { truncate } from 'lodash'
import { EllipsisVerticalIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ROUTES } from '~/config/routes'
import { formatDateToReadableString } from '~/lib/date'
import { cn } from '~/lib/utils'
import { formatOrganizationTransactionCategoryType } from '~/services/organization-transaction-category/lib/formatOrganizationTransactionCategoryType'
import { OrganizationTransaction } from '~/services/organization-transaction/model'

import { UserCard } from '../shared/user-card'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

const getFormattedAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount)
}

export const columns: ColumnDef<OrganizationTransaction>[] = [
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
        cell: ({ row }) => truncate(row.original.description, { length: 20 }),
    },
    {
        id: 'amount',
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => getFormattedAmount(row.original.amount, row.original.currency),
    },
    {
        id: 'category',
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <div className={cn('h-2 w-2 rounded-xs')} style={{ backgroundColor: row.original.category.color || '#000000' }} />
                <span>{formatOrganizationTransactionCategoryType(row.original.category.type)}</span>
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
    {
        id: 'actions',
        accessorKey: 'actions',
        header: '',
        size: 40,
        cell: () => (
            <Button variant="outline" size="icon" className="text-center">
                <EllipsisVerticalIcon className="h-4 w-4" />
            </Button>
        ),
    },
]

interface Props {
    organizationId: string
    transactions: OrganizationTransaction[]
    selectedTransactions: OrganizationTransaction[]
    setSelectedTransactions: (transactions: OrganizationTransaction[]) => void
}

export const TransactionsTable = ({ organizationId, transactions, selectedTransactions, setSelectedTransactions }: Props) => {
    const [rowSelection, setRowSelection] = useState({})
    const router = useRouter()

    const table = useReactTable({
        data: transactions,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    })

    const selectedTableRows = table.getSelectedRowModel().rows.map((row) => row.original)

    useEffect(() => {
        setSelectedTransactions(selectedTableRows)
    }, [selectedTableRows.length])

    useEffect(() => {
        if (selectedTransactions.length === 0) {
            setRowSelection({})
        }
    }, [selectedTransactions.length])

    const handleRowClick = (transactionId: string) => {
        router.push(`${ROUTES.DASHBOARD.TRANSACTIONS(organizationId)}?transactionId=${transactionId}`)
    }

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead
                                    key={header.id}
                                    style={{
                                        minWidth: header.column.columnDef.size,
                                        maxWidth: header.column.columnDef.size,
                                    }}
                                >
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            )
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && 'selected'}
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => handleRowClick(row.original.id)}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
                                    key={cell.id}
                                    style={{
                                        minWidth: cell.column.columnDef.size,
                                        maxWidth: cell.column.columnDef.size,
                                    }}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
