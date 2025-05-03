import { formatDateToReadableString } from '~/lib/date/date'
import { OrganizationProductsAndServices } from '~/services/organization-products-and-services/model'

import { Sheet, SheetContent, SheetTitle } from '../ui/sheet'
import { ProductsAndServicesForm } from './products-and-services-form'

interface Props {
    isOpen: boolean
    organizationId: string
    productAndServiceId?: string
    productsAndServices?: OrganizationProductsAndServices[]
    onOpenChange: (isOpen: boolean) => void
    onFormSubmit: () => void
}

const SHEET_MAX_HEIGHT = 'calc(100vh-20px)'

export const ProductsAndServicesSheet = ({
    isOpen,
    productAndServiceId,
    productsAndServices,
    onOpenChange,
    organizationId,
    onFormSubmit,
}: Props) => {
    const productAndService = productsAndServices?.find((productAndService) => productAndService.id === productAndServiceId)

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent
                className={`max-h-[${SHEET_MAX_HEIGHT}] md:mt-3 md:mb-3 md:mr-3 rounded-xs p-4 gap-6 flex flex-col min-w-md pt-12`}
            >
                {productAndService && (
                    <div className="flex flex-col gap-4">
                        <p className="text-xs font-light font-mono text-muted-foreground">
                            Last update: {formatDateToReadableString(productAndService.updatedAt)}
                        </p>
                    </div>
                )}

                <SheetTitle>
                    <h3 className="text-lg font-medium">{productAndService ? 'Edit' : 'Create'} product or service</h3>
                </SheetTitle>

                <ProductsAndServicesForm organizationId={organizationId} productAndService={productAndService} onSubmit={onFormSubmit} />
            </SheetContent>
        </Sheet>
    )
}
