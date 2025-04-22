import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { ROUTES } from '~/config/routes'
import { OrganizationTransaction } from '~/services/organization-transaction/model'
import { TransactionsTableActions } from './transactions-table-actions'
import { transactionsTableColumns } from './transactions-table-columns'

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
        columns: transactionsTableColumns,
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
        <>
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
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        style={{
                                            minWidth: cell.column.columnDef.size,
                                            maxWidth: cell.column.columnDef.size,
                                        }}
                                        onClick={() => handleRowClick(row.original.id)}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}

                                {/* Additional column for actions */}
                                <TableCell className="text-center" width={20}>
                                    <TransactionsTableActions transaction={row.original} organizationId={organizationId} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={transactionsTableColumns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}
