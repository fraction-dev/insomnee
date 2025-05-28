import { useCustomers } from '~/hooks/customer/useCustomers'
import { Invoice } from '~/services/invoice/model'

import { ScrollArea } from '../ui/scroll-area'
import { Sheet, SheetContent } from '../ui/sheet'
import { InvoiceDetails } from './invoice-details/invoice-details'
import { InvoiceForm } from './invoice-form/invoice-form'

interface Props {
    invoice?: Invoice
    stateType: 'details' | 'edit' | null
    organizationId: string
    isOpen: boolean
    onClose: () => void
}

export const InvoiceSheet = ({ invoice, organizationId, isOpen, stateType, onClose }: Props) => {
    const { data: customers } = useCustomers(organizationId)

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="max-h-[calc(100vh-20px)] mt-3 mb-3 mr-3 rounded-xs px-12 py-12 gap-6 flex flex-col lg:min-w-[600px]">
                <ScrollArea isScrollBarHidden className="h-full pb-12">
                    {stateType === 'details' && invoice ? (
                        <InvoiceDetails organizationId={organizationId} invoice={invoice} />
                    ) : (
                        <InvoiceForm invoice={invoice} customers={customers?.data ?? []} organizationId={organizationId} />
                    )}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
