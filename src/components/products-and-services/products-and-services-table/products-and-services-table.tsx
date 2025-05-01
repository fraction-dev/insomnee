import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { useCreateQueryString } from '~/hooks/useCreateQueryString'
import { OrganizationProductsAndServices } from '~/services/organization-products-and-services/model'

import { productsAndServicesTableColumns } from './products-and-services-table-columns'

interface Props {
    productsAndServices: OrganizationProductsAndServices[]
    selectedProductsAndServices: OrganizationProductsAndServices[]
    setSelectedProductsAndServices: (productsAndServices: OrganizationProductsAndServices[]) => void
}

export const ProductsAndServicesTable = ({ productsAndServices, selectedProductsAndServices, setSelectedProductsAndServices }: Props) => {
    const [rowSelection, setRowSelection] = useState({})
    const { createQueryString } = useCreateQueryString()

    const table = useReactTable({
        data: productsAndServices,
        columns: productsAndServicesTableColumns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    })

    const selectedTableRows = table.getSelectedRowModel().rows.map((row) => row.original)

    useEffect(() => {
        setSelectedProductsAndServices(selectedTableRows)
    }, [selectedTableRows.length, setSelectedProductsAndServices, selectedTableRows])

    useEffect(() => {
        if (selectedProductsAndServices.length === 0) {
            setRowSelection({})
        }
    }, [selectedProductsAndServices.length])

    const handleRowClick = (productAndServiceId: string) => {
        window.history.pushState(null, '', `?${createQueryString('productAndServiceId', productAndServiceId)}`)
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
                            <TableCell colSpan={productsAndServicesTableColumns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}
