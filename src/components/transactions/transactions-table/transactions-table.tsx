import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { ROUTES } from '~/config/routes'
import { Transaction } from '~/services/transaction/model'

import { TransactionsTableActions } from './transactions-table-actions'
import { transactionsTableColumns } from './transactions-table-columns'

interface Props {
    organizationId: string
    transactions: Transaction[]
    selectedTransactions: Transaction[]
    setSelectedTransactions: (transactions: Transaction[]) => void
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                    <TableHead key={header.id}>
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
                            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} onClick={() => handleRowClick(row.original.id)}>
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
