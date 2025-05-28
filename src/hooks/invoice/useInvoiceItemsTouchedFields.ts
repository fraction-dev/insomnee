import { useCallback, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { InvoiceFormValues } from '~/services/invoice/model'

type ItemFieldKey = `${number}.${keyof InvoiceFormValues['items'][number]}`

export const useInvoiceItemsTouchedFields = () => {
    const form = useFormContext<InvoiceFormValues>()
    const { fields } = useFieldArray<InvoiceFormValues>({
        control: form.control,
        name: 'items' as const,
    })

    const [touchedFields, setTouchedFields] = useState<Array<ItemFieldKey>>(
        fields
            .flatMap((_, index) => {
                const touched = []

                if (form.getValues(`items.${index}.description`) === '') {
                    touched.push(`${index}.description`)
                }

                if (form.getValues(`items.${index}.quantity`) === undefined) {
                    touched.push(`${index}.quantity`)
                }

                if (form.getValues(`items.${index}.price`) === undefined) {
                    touched.push(`${index}.price`)
                }

                return touched
            })
            .filter((field) => field !== undefined)
            .map((field) => field as ItemFieldKey),
    )

    const isFieldTouched = useCallback(
        (index: number, field: keyof InvoiceFormValues['items'][number]) => {
            return touchedFields.includes(`${index}.${field}` as ItemFieldKey)
        },
        [touchedFields],
    )

    const handleTouch = useCallback(
        (index: number, field: keyof InvoiceFormValues['items'][number]) => {
            setTouchedFields((prev) => {
                const fieldKey = `${index}.${field}` as ItemFieldKey
                const isNotTouched = prev.includes(fieldKey)

                if (isNotTouched) {
                    return prev.filter((f) => f !== fieldKey)
                }

                const value = form.getValues(`items.${index}.${field}`)
                if (value === '' || value === undefined || value === 0) {
                    return [...prev, fieldKey]
                }
                return prev.filter((f) => f !== fieldKey)
            })
        },
        [form],
    )

    return {
        isFieldTouched,
        handleTouch,
    }
}
