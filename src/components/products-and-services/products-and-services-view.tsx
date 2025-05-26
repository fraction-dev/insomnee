'use client'

import { useState } from 'react'

import { useProductsAndServices } from '~/hooks/product-and-service/useProductsAndServices'
import { useProductsAndServicesSheet } from '~/hooks/product-and-service/useProductsAndServicesSheet'
import { ProductAndService } from '~/services/product-and-service/model'

import { Skeleton } from '../ui/skeleton'
import { ProductsAndServicesHeader } from './products-and-services-header'
import { ProductsAndServicesSheet } from './products-and-services-sheet'
import { ProductsAndServicesTable } from './products-and-services-table/products-and-services-table'

interface Props {
    organizationId: string
}

export const ProductsAndServicesView = ({ organizationId }: Props) => {
    const { data: productsAndServices, isLoading } = useProductsAndServices(organizationId)
    const { isSheetOpen, handleCleanQueryParams, productAndServiceId } = useProductsAndServicesSheet()

    const [selectedProductsAndServices, setSelectedProductsAndServices] = useState<ProductAndService[]>([])

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-12">
                    <Skeleton className="h-24 w-52" />
                    <Skeleton className="size-10" />
                </div>

                <Skeleton className="h-[500px] w-full" />
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <ProductsAndServicesHeader
                    organizationId={organizationId}
                    selectedProductsAndServices={selectedProductsAndServices}
                    setSelectedProductsAndServices={setSelectedProductsAndServices}
                />
                <ProductsAndServicesTable
                    productsAndServices={productsAndServices?.data ?? []}
                    selectedProductsAndServices={selectedProductsAndServices}
                    setSelectedProductsAndServices={setSelectedProductsAndServices}
                />
            </div>

            <ProductsAndServicesSheet
                isOpen={Boolean(isSheetOpen)}
                productsAndServices={productsAndServices?.data ?? []}
                productAndServiceId={productAndServiceId ?? undefined}
                organizationId={organizationId}
                onOpenChange={handleCleanQueryParams}
                onFormSubmit={handleCleanQueryParams}
            />
        </>
    )
}
