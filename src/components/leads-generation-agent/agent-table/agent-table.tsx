import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import Link from 'next/link'

import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { ROUTES } from '~/config/routes'
import { LeadsGenerationAgentRun } from '~/services/leads-generation/model'

import { leadsGenerationAgentTableColumns } from './agent-table-columns'

interface Props {
    organizationId: string
    runs: LeadsGenerationAgentRun[]
}

export const LeadsGenerationAgentTable = ({ organizationId, runs }: Props) => {
    const table = useReactTable({
        data: runs,
        columns: leadsGenerationAgentTableColumns,
        getCoreRowModel: getCoreRowModel(),
    })

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
                                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                ))}

                                <TableCell className="flex justify-center">
                                    {row.original.status === 'COMPLETED' && (
                                        <Link href={ROUTES.DASHBOARD.AGENTS.LEAD_GENERATION_RUN(organizationId, row.original.id)}>
                                            <Button size="sm">Report</Button>
                                        </Link>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={leadsGenerationAgentTableColumns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}
