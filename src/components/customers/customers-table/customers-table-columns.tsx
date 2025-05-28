import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '~/components/ui/checkbox'
import { cn } from '~/lib/shared/utils'
import { Customer } from '~/services/customer/model'

export const customersTableColumns: ColumnDef<Customer>[] = [
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
        header: 'Name',
        accessorKey: 'name',
    },
    {
        header: 'Email',
        accessorKey: 'email',
        cell: ({ row }) => <p className={cn({ 'text-muted-foreground': !row.original.email })}>{row.original.email || '-'}</p>,
    },
    {
        header: 'Contact person',
        accessorKey: 'contactPerson',
        cell: ({ row }) => (
            <p className={cn({ 'text-muted-foreground': !row.original.contactPerson })}>{row.original.contactPerson || '-'}</p>
        ),
    },
    {
        header: 'Phone',
        accessorKey: 'phoneNumber',
        cell: ({ row }) => <p className={cn({ 'text-muted-foreground': !row.original.phoneNumber })}>{row.original.phoneNumber || '-'}</p>,
    },
    {
        header: 'Invoices',
        accessorKey: 'invoices',
        cell: ({ row }) => ((row.original.invoices?.length ?? 0) > 0 ? row.original.invoices?.length : '-'),
    },
]
