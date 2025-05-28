import { memo } from 'react'
import { useFormContext } from 'react-hook-form'

import { useInvoiceTouchedFields } from '~/hooks/invoice/useInvoiceTouchedFields'
import { InvoiceFormValues } from '~/services/invoice/model'

import { InvoicePlaceholder } from './invoice-placeholder'
import { InvoiceTextarea } from './invoice-textarea'

export const InvoiceFooter = memo(() => {
    const { register } = useFormContext<InvoiceFormValues>()
    const { isFieldTouched, handleTouch } = useInvoiceTouchedFields()

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
                <p className="text-[11px] text-muted-foreground font-mono">Payment details</p>

                {!isFieldTouched('paymentDetails') ? (
                    <InvoiceTextarea
                        autoFocus
                        register={register}
                        name="paymentDetails"
                        className="h-24 font-mono !text-[11px] placeholder:text-[11px]"
                        onBlur={() => handleTouch('paymentDetails')}
                    />
                ) : (
                    <InvoicePlaceholder className="h-24" onClick={() => handleTouch('paymentDetails')} />
                )}
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-[11px] text-muted-foreground font-mono">Notes</p>

                {!isFieldTouched('notes') ? (
                    <InvoiceTextarea
                        autoFocus
                        register={register}
                        name="notes"
                        className="h-24 font-mono !text-[11px] placeholder:text-[11px]"
                        onBlur={() => handleTouch('notes')}
                    />
                ) : (
                    <InvoicePlaceholder className="h-24" onClick={() => handleTouch('notes')} />
                )}
            </div>
        </div>
    )
})

InvoiceFooter.displayName = 'InvoiceFooter'
