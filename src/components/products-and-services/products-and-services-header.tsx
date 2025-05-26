import { FilePlusIcon, FolderInputIcon, PlusIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

import { ROUTES } from '~/config/routes'
import { useDeleteProductsAndServices } from '~/hooks/product-and-service/useDeleteProductsAndServices'
import { useCreateQueryString } from '~/hooks/shared/useCreateQueryString'
import { ProductAndService } from '~/services/product-and-service/model'

import { DeleteDialog } from '../shared/delete-dialog'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { ProductsAndServicesImportModal } from './products-and-services-import-modal'

interface Props {
    organizationId: string
    selectedProductsAndServices: ProductAndService[]
    setSelectedProductsAndServices: (productsAndServices: ProductAndService[]) => void
}

export const ProductsAndServicesHeader = ({ organizationId, selectedProductsAndServices, setSelectedProductsAndServices }: Props) => {
    const { createQueryString } = useCreateQueryString()
    const { mutate: deleteProductsAndServices, isPending: isDeleting } = useDeleteProductsAndServices(organizationId)

    const [isImportModalOpen, setIsImportModalOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const handleToggleImportModal = () => {
        setIsImportModalOpen((prev) => !prev)
    }

    const handleDeleteProductsAndServices = () => {
        deleteProductsAndServices(
            selectedProductsAndServices.map((productAndService) => productAndService.id),
            {
                onSuccess: () => {
                    setIsDeleteDialogOpen(false)
                    setSelectedProductsAndServices([])
                    toast.success('Products and services deleted successfully')
                },
            },
        )
    }

    return (
        <>
            <div className="flex items-center justify-between gap-12">
                <div className="flex flex-col gap-2 max-w-xl">
                    <p className="text-muted-foreground text-sm leading-relaxed font-normal">
                        Manage your products and services here and keep track of their prices. It will help agents to analyze the best
                        options for the customer, prepare the best quotes and proposals, track the status of the orders and more.
                    </p>
                </div>

                {selectedProductsAndServices.length > 0 && (
                    <Button size="icon" variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                        <TrashIcon className="size-4" />
                    </Button>
                )}

                {selectedProductsAndServices.length === 0 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <PlusIcon className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="start" className="mr-6">
                            <DropdownMenuItem onClick={handleToggleImportModal}>
                                <FolderInputIcon className="size-4" />
                                Import from file
                            </DropdownMenuItem>

                            <Link
                                href={`${ROUTES.DASHBOARD.PRODUCTS_AND_SERVICES(organizationId)}?${createQueryString('isCreatingProductAndService', 'true')}`}
                            >
                                <DropdownMenuItem>
                                    <FilePlusIcon className="size-4" />
                                    Add manually
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>

            <ProductsAndServicesImportModal isOpen={isImportModalOpen} onOpenChange={setIsImportModalOpen} />
            <DeleteDialog
                isOpen={isDeleteDialogOpen}
                isLoading={isDeleting}
                description="This action cannot be undone and the products and services will be permanently deleted."
                title="Are you sure you want to delete these products and services?"
                onOpenChange={setIsDeleteDialogOpen}
                onDelete={handleDeleteProductsAndServices}
            />
        </>
    )
}
