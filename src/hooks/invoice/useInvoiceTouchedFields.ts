import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { InvoiceFormValues } from '~/services/invoice/model'

type TouchedFields = Array<keyof InvoiceFormValues>

export const useInvoiceTouchedFields = () => {
    const form = useFormContext()
    const [isTouched, setIsTouched] = useState<TouchedFields>([])

    const handleTouch = useCallback(
        (key: keyof InvoiceFormValues) => {
            setIsTouched((prev) => {
                const isNotTouched = prev.includes(key)
                if (isNotTouched) {
                    return prev.filter((field) => field !== key)
                }

                const value = form.getValues(key)
                if (value === '' || value === undefined) {
                    return [...prev, key]
                }
                return prev.filter((field) => field !== key)
            })
        },
        [form],
    )

    const isFieldTouched = useCallback(
        (key: keyof InvoiceFormValues) => {
            return isTouched.includes(key)
        },
        [isTouched],
    )

    return {
        isFieldTouched,
        handleTouch,
    }
}
