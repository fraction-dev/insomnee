import { useSearchParams } from 'next/navigation'

export const useOrganizationTransactionSheet = () => {
    const searchParams = useSearchParams()

    const isCreatingTransaction = searchParams.get('isCreatingTransaction') === 'true'
    const transactionId = searchParams.get('transactionId')

    const isSheetOpen = isCreatingTransaction || transactionId

    const handleCleanQueryParams = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('isCreatingTransaction')
        params.delete('transactionId')
        window.history.pushState(null, '', `?${params.toString()}`)
    }

    return {
        isCreatingTransaction,
        transactionId,
        isSheetOpen,
        handleCleanQueryParams,
    }
}
