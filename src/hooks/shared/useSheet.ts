import { useSearchParams } from 'next/navigation'

type Type = 'customer' | 'invoice' | 'transaction' | 'vaultFile'

export const useSheet = (type: Type) => {
    const searchParams = useSearchParams()

    const isCreating = searchParams.get(`isCreateNew`) === 'true'
    const id = searchParams.get(`${type}Id`)
    const stateType = searchParams.get(`type`) as 'details' | 'edit' | null

    const isSheetOpen = Boolean(isCreating || id)

    const handleCleanQueryParams = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete(`isCreateNew`)
        params.delete(`${type}Id`)
        params.delete(`type`)
        window.history.pushState(null, '', `?${params.toString()}`)
    }

    return {
        isCreating: isCreating && stateType !== 'details',
        stateType,
        id,
        isSheetOpen,
        handleCleanQueryParams,
    }
}
