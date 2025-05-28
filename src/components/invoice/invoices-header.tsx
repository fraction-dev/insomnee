import { Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { ROUTES } from '~/config/routes'
import { useDeleteInvoices } from '~/hooks/invoice/useDeleteInvoices'
import { useCreateQueryString } from '~/hooks/shared/useCreateQueryString'
import { Invoice } from '~/services/invoice/model'

import { DeleteDialog } from '../shared/delete-dialog'
import { Button } from '../ui/button'

interface Props {
    organizationId: string
    selectedRows: Invoice[]
    setSelectedRows: (rows: Invoice[]) => void
}

export const InvoicesHeader = ({ organizationId, selectedRows, setSelectedRows }: Props) => {
    const { createQueryString } = useCreateQueryString()
    const { mutate: deleteInvoices, isPending: isDeleting } = useDeleteInvoices(organizationId)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const handleTriggerDeleteDialog = () => {
        setIsDeleteDialogOpen((prev) => !prev)
    }

    const handleDeleteInvoices = () => {
        deleteInvoices(
            selectedRows.map((row) => row.id),
            { onSuccess: () => setSelectedRows([]) },
        )
    }

    return (
        <>
            <div className="flex items-center justify-end gap-12">
                <div className="flex items-center gap-2">
                    {selectedRows.length ? (
                        <Button variant="destructive" size="icon" onClick={handleTriggerDeleteDialog}>
                            <Trash2 />
                        </Button>
                    ) : (
                        <Link href={`${ROUTES.DASHBOARD.INVOICES(organizationId)}?${createQueryString('isCreateNew', 'true')}`}>
                            <Button size="icon" variant="outline">
                                <Plus />
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            <DeleteDialog
                isLoading={isDeleting}
                title={`Delete ${selectedRows.length} invoices`}
                description={`Are you sure you want to delete ${selectedRows.length} invoices? This action cannot be undone and you will not be able to recover them.`}
                isOpen={isDeleteDialogOpen}
                onDelete={handleDeleteInvoices}
                onOpenChange={handleTriggerDeleteDialog}
            />
        </>
    )
}
