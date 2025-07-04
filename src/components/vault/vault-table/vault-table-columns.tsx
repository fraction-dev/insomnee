import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '~/components/ui/badge'
import { Checkbox } from '~/components/ui/checkbox'
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area'
import { formatDateToReadableString } from '~/lib/date/date'
import { getReadableFileSize } from '~/lib/file'
import { FileUpload } from '~/services/file-upload/model'

export const vaultTableColumns: ColumnDef<FileUpload>[] = [
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
        id: 'name',
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <p>{row.original.title || row.original.name}</p>,
    },
    {
        id: 'tags',
        accessorKey: 'tags',
        header: 'Tags',
        cell: ({ row }) => (
            <ScrollArea className="max-w-xs">
                <div className="flex gap-2">
                    {row.original.tags?.map((tag) => (
                        <Badge key={tag} className="text-xs text-muted-foreground font-mono rounded-xs" variant="outline">
                            {tag}
                        </Badge>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
        ),
    },
    {
        id: 'originalName',
        accessorKey: 'name',
        header: 'Original name',
    },
    {
        id: 'size',
        accessorKey: 'size',
        header: 'Size',
        cell: ({ row }) => <p>{getReadableFileSize(row.original.size)}</p>,
    },
    {
        id: 'createdAt',
        accessorKey: 'createdAt',
        header: 'Created at',
        cell: ({ row }) => <p>{formatDateToReadableString(row.original.createdAt)}</p>,
    },
]
