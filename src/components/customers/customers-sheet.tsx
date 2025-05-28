import { Customer } from '~/services/customer/model'

import { ScrollArea } from '../ui/scroll-area'
import { Sheet, SheetContent } from '../ui/sheet'
import { CustomersForm } from './customers-form'

interface Props {
    customer?: Customer
    organizationId: string
    isOpen: boolean
    onClose: () => void
}

export const CustomersSheet = ({ customer, organizationId, isOpen, onClose }: Props) => {
    const handleSuccess = () => {
        onClose()
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="max-h-[calc(100vh-20px)] mt-3 mb-3 mr-3 rounded-xs p-4 min-w-md">
                <ScrollArea isScrollBarHidden className="h-full pb-12">
                    <CustomersForm customer={customer} organizationId={organizationId} onSuccess={handleSuccess} />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
