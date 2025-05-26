import { Customer } from '~/services/customer/model'

import { Sheet, SheetContent, SheetTitle } from '../ui/sheet'
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
            <SheetContent className="max-h-[calc(100vh-20px)] mt-3 mb-3 mr-3 rounded-xs p-4 gap-6 flex flex-col min-w-md pt-12">
                <SheetTitle>
                    <h3 className="text-lg font-medium">{customer ? 'Edit customer' : 'Create customer'}</h3>
                </SheetTitle>

                <CustomersForm customer={customer} organizationId={organizationId} onSuccess={handleSuccess} />
            </SheetContent>
        </Sheet>
    )
}
