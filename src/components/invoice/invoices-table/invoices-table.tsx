import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { ROUTES } from '~/config/routes'
import { Invoice } from '~/services/invoice/model'

import { InvoicesTableActions } from './invoices-table-actions'
import { invoicesTableColumns } from './invoices-table-columns'

interface Props {
    organizationId: string
    invoices: Invoice[]
    selectedRows: Invoice[]
    setSelectedRows: (rows: Invoice[]) => void
}

export const InvoicesTable = ({ organizationId, invoices, selectedRows, setSelectedRows }: Props) => {
    const [rowSelection, setRowSelection] = useState({})
    const router = useRouter()

    const table = useReactTable({
        data: invoices,
        columns: invoicesTableColumns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    })

    const selectedTableRows = table.getSelectedRowModel().rows.map((row) => row.original)

    useEffect(() => {
        setSelectedRows(selectedTableRows)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTableRows.length])

    useEffect(() => {
        if (selectedRows.length === 0) {
            setRowSelection({})
        }
    }, [selectedRows.length])

    const handleRowClick = (invoiceId: string) => {
        router.push(`${ROUTES.DASHBOARD.INVOICES(organizationId)}?invoiceId=${invoiceId}&type=details`)
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
                                    <TableCell key={cell.id} className="cursor-pointer" onClick={() => handleRowClick(row.original.id)}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}

                                <TableCell className="flex justify-center">
                                    <InvoicesTableActions organizationId={organizationId} invoice={row.original} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={invoicesTableColumns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}
