import { useSearchParams } from 'next/navigation'

export const useCustomersSheet = () => {
    const searchParams = useSearchParams()

    const isCreatingCustomer = searchParams.get('isCreateNew') === 'true'
    const customerId = searchParams.get('customerId')

    const isSheetOpen = Boolean(isCreatingCustomer || customerId)

    const handleCleanQueryParams = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('isCreateNew')
        params.delete('customerId')
        window.history.pushState(null, '', `?${params.toString()}`)
    }

    return {
        isCreatingCustomer,
        customerId,
        isSheetOpen,
        handleCleanQueryParams,
    }
}
