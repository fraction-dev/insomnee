import { ColumnDef } from '@tanstack/react-table'
import { truncate } from 'lodash'
import { FileIcon } from 'lucide-react'

import { Checkbox } from '~/components/ui/checkbox'
import { formatCurrency } from '~/lib/currency/format-currency'
import { formatDateToReadableString } from '~/lib/date/date'
import { OrganizationProductsAndServices } from '~/services/organization-products-and-services/model'

const MAX_FILES_TO_SHOW = 1

export const productsAndServicesTableColumns: ColumnDef<OrganizationProductsAndServices>[] = [
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
        id: 'title',
        accessorKey: 'name',
        header: 'Title',
        cell: ({ row }) => truncate(row.original.name, { length: 150 }),
    },
    {
        id: 'price',
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => formatCurrency(row.original.price ?? 0, row.original.currency),
    },
    {
        id: 'files',
        accessorKey: 'files',
        header: 'Attached files',
        cell: ({ row }) =>
            row.original.files.length > 0 ? (
                <div className="flex items-center justify-between gap-12">
                    {row.original.files.slice(0, MAX_FILES_TO_SHOW).map((file) => (
                        <div key={file.id} className="flex items-center gap-1">
                            <FileIcon className="size-3" />
                            <p className="text-xs">{truncate(file.name, { length: 35 })}</p>
                            {row.original.files.length > MAX_FILES_TO_SHOW && (
                                <span className="text-xs text-muted-foreground">
                                    (+{row.original.files.length - MAX_FILES_TO_SHOW} more)
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                '-'
            ),
    },
    {
        id: 'updatedAt',
        accessorKey: 'updatedAt',
        header: 'Last updated at',
        cell: ({ row }) => formatDateToReadableString(row.original.updatedAt, { withHours: true }),
    },
]
