import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { ROUTES } from '~/config/routes'
import { FileUpload } from '~/services/file-upload/model'

import { VaultTableActions } from './vault-table-actions'
import { vaultTableColumns } from './vault-table-columns'

interface Props {
    organizationId: string
    files: FileUpload[]
    selectedRows: FileUpload[]
    setSelectedRows: (rows: FileUpload[]) => void
}

export const VaultTable = ({ organizationId, files, selectedRows, setSelectedRows }: Props) => {
    const [rowSelection, setRowSelection] = useState({})
    const router = useRouter()

    const table = useReactTable({
        data: files,
        columns: vaultTableColumns,
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

    const handleRowClick = (fileId: string) => {
        router.push(`${ROUTES.DASHBOARD.VAULT(organizationId)}?vaultFileId=${fileId}`)
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
                                    <VaultTableActions organizationId={organizationId} file={row.original} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={vaultTableColumns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}
