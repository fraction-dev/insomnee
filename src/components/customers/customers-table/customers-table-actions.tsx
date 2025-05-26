import { EllipsisVerticalIcon } from 'lucide-react'
import { useState } from 'react'

import { DeleteDialog } from '~/components/shared/delete-dialog'
import { Button } from '~/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { useArchiveCustomers } from '~/hooks/customer/useArchiveCustomers'
import { Customer } from '~/services/customer/model'

import { CustomersSheet } from '../customers-sheet'

interface Props {
    organizationId: string
    customer: Customer
}

export const CustomersTableActions = ({ organizationId, customer }: Props) => {
    const { mutate: deleteCustomer, isPending: isDeleting } = useArchiveCustomers(organizationId)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isDuplicateSheetOpen, setIsDuplicateSheetOpen] = useState(false)

    const handleDeleteCustomer = () => {
        deleteCustomer([customer.id], {
            onSuccess: () => {
                setIsDeleteDialogOpen(false)
            },
        })
    }

    const handleTriggerDeleteDialog = () => {
        setIsDeleteDialogOpen(!isDeleteDialogOpen)
    }

    const handleTriggerDuplicateSheet = () => {
        setIsDuplicateSheetOpen(!isDuplicateSheetOpen)
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="text-center" onClick={(e) => e.stopPropagation()}>
                        <EllipsisVerticalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onSelect={handleTriggerDuplicateSheet}>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onSelect={handleTriggerDeleteDialog}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteDialog
                isOpen={isDeleteDialogOpen}
                isLoading={isDeleting}
                description="Are you sure you want to delete this customer?"
                onDelete={handleDeleteCustomer}
                onOpenChange={handleTriggerDeleteDialog}
            />

            <CustomersSheet
                isOpen={isDuplicateSheetOpen}
                organizationId={organizationId}
                customer={customer}
                onClose={() => setIsDuplicateSheetOpen(false)}
            />
        </>
    )
}
