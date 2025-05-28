import { EllipsisVerticalIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { DeleteDialog } from '~/components/shared/delete-dialog'
import { Button } from '~/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { ROUTES } from '~/config/routes'
import { useDeleteInvoices } from '~/hooks/invoice/useDeleteInvoices'
import { Invoice } from '~/services/invoice/model'

interface Props {
    organizationId: string
    invoice: Invoice
}

export const InvoicesTableActions = ({ invoice, organizationId }: Props) => {
    const router = useRouter()
    const { mutate: deleteInvoices, isPending: isDeleting } = useDeleteInvoices(organizationId)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const INTERNAL_DASHBOARD_LINK = `${ROUTES.DASHBOARD.INVOICES(organizationId)}?invoiceId=${invoice.id}`
    const INTERNAL_INVOICE_LINK = `${window.location.origin}/${ROUTES.INVOICE(invoice.id)}`

    const handleEditInvoiceClick = () => {
        router.push(`${INTERNAL_DASHBOARD_LINK}&type=edit`)
    }

    const handleOpenInvoiceClick = () => {
        window.open(INTERNAL_INVOICE_LINK, '_blank')
    }

    const handleCopyLinkClick = () => {
        navigator.clipboard.writeText(INTERNAL_INVOICE_LINK)
    }

    const handleTriggerDeleteDialog = () => {
        setIsDeleteDialogOpen(!isDeleteDialogOpen)
    }

    const handleDeleteInvoice = () => {
        deleteInvoices([invoice.id], {
            onSuccess: () => {
                handleTriggerDeleteDialog()
            },
        })
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
                    <DropdownMenuItem onClick={handleEditInvoiceClick}>Edit invoice</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleOpenInvoiceClick}>Open invoice</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopyLinkClick}>Copy link</DropdownMenuItem>
                    <DropdownMenuItem disabled>Download</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={handleTriggerDeleteDialog}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteDialog
                isLoading={isDeleting}
                title={`Delete invoice ${invoice.number}`}
                description={`Are you sure you want to delete invoice ${invoice.number}? This action cannot be undone and you will not be able to recover it.`}
                isOpen={isDeleteDialogOpen}
                onDelete={handleDeleteInvoice}
                onOpenChange={handleTriggerDeleteDialog}
            />
        </>
    )
}
