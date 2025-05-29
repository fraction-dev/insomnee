import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { ROUTES } from '~/config/routes'
import { Customer } from '~/services/customer/model'

import { CustomersTableActions } from './customers-table-actions'
import { customersTableColumns } from './customers-table-columns'

interface Props {
    organizationId: string
    customers: Customer[]
    selectedRows: Customer[]
    setSelectedRows: (rows: Customer[]) => void
}

export const CustomersTable = ({ organizationId, customers, selectedRows, setSelectedRows }: Props) => {
    const [rowSelection, setRowSelection] = useState({})
    const router = useRouter()

    const table = useReactTable({
        data: customers,
        columns: customersTableColumns,
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

    const handleRowClick = (customerId: string) => {
        router.push(`${ROUTES.DASHBOARD.CUSTOMERS(organizationId)}?customerId=${customerId}`)
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
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                                className="hover:bg-gray-50 dark:hover:bg-neutral-900"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="cursor-pointer" onClick={() => handleRowClick(row.original.id)}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}

                                <TableCell className="flex justify-center">
                                    <CustomersTableActions organizationId={organizationId} customer={row.original} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={customersTableColumns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}
