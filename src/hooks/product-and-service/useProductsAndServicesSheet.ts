import { useSearchParams } from 'next/navigation'

export const useProductsAndServicesSheet = () => {
    const searchParams = useSearchParams()

    const isCreatingProductAndService = searchParams.get('isCreatingProductAndService') === 'true'
    const productAndServiceId = searchParams.get('productAndServiceId')

    const isSheetOpen = isCreatingProductAndService || productAndServiceId

    const handleCleanQueryParams = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('isCreatingProductAndService')
        params.delete('productAndServiceId')
        window.history.pushState(null, '', `?${params.toString()}`)
    }

    return {
        isCreatingProductAndService,
        productAndServiceId,
        isSheetOpen,
        handleCleanQueryParams,
    }
}
