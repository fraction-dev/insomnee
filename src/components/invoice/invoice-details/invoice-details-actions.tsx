import dayjs from 'dayjs'
import { CheckIcon, PencilIcon, RotateCcwIcon, TrashIcon, XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { DatePicker } from '~/components/shared/date-picker'
import { DeleteDialog } from '~/components/shared/delete-dialog'
import { Button } from '~/components/ui/button'
import { ROUTES } from '~/config/routes'
import { useDeleteInvoices } from '~/hooks/invoice/useDeleteInvoices'
import { useUpdateInvoice } from '~/hooks/invoice/useUpdateInvoice'
import { useSheet } from '~/hooks/shared/useSheet'
import { Invoice, InvoiceUpdatePayload } from '~/services/invoice/model'

interface Props {
    organizationId: string
    invoice: Invoice
}

export const InvoiceDetailsActions = ({ organizationId, invoice }: Props) => {
    const router = useRouter()
    const { handleCleanQueryParams } = useSheet('invoice')
    const { mutate: updateInvoice } = useUpdateInvoice(organizationId)
    const { mutate: deleteInvoices, isPending: isDeleting } = useDeleteInvoices(organizationId)

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const handleEditClick = () => {
        router.push(`${ROUTES.DASHBOARD.INVOICES(organizationId)}?invoiceId=${invoice.id}&type=edit`)
    }

    const handleUpdateInvoice = (payload: InvoiceUpdatePayload) => {
        updateInvoice({ id: invoice.id, ...payload })
    }

    const handleDeleteInvoice = () => {
        deleteInvoices([invoice.id], { onSuccess: handleCleanQueryParams })
    }

    const handleTriggerDeleteDialog = () => {
        setIsDeleteDialogOpen((prev) => !prev)
    }

    return (
        <>
            <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-muted-foreground/5" onClick={handleEditClick}>
                        <PencilIcon className="size-3" />
                        <span className="font-normal text-xs">Edit</span>
                    </Button>

                    {(invoice.status === 'DRAFT' || invoice.status === 'UNPAID' || invoice.status === 'OVERDUE') && (
                        <DatePicker
                            disabledRange={dayjs().toDate()}
                            value={''}
                            onChange={(date) => {
                                handleUpdateInvoice({ paidAt: new Date(date) })
                            }}
                        >
                            <Button variant="outline" size="sm" className="bg-muted-foreground/5">
                                <CheckIcon className="size-3" />
                                <span className="font-normal text-xs">Mark as paid</span>
                            </Button>
                        </DatePicker>
                    )}

                    {(invoice.status === 'PAID' || invoice.status === 'SENT') && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-muted-foreground/5"
                            onClick={() => handleUpdateInvoice({ status: 'UNPAID' })}
                        >
                            <XIcon className="size-3" />
                            <span className="font-normal text-xs">Mark as unpaid</span>
                        </Button>
                    )}

                    {invoice.status === 'CANCELLED' && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-muted-foreground/5"
                            onClick={() => handleUpdateInvoice({ status: 'DRAFT' })}
                        >
                            <RotateCcwIcon className="size-3" />
                            <span className="font-normal text-xs">Restore to draft</span>
                        </Button>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="destructive" size="sm" onClick={handleTriggerDeleteDialog}>
                        <TrashIcon className="size-3" />
                        <span className="font-normal text-xs">Delete</span>
                    </Button>
                </div>
            </div>

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
