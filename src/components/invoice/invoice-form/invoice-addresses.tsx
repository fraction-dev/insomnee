import { memo } from 'react'
import { useFormContext } from 'react-hook-form'

import { useInvoiceTouchedFields } from '~/hooks/invoice/useInvoiceTouchedFields'
import { Customer } from '~/services/customer/model'
import { InvoiceFormValues } from '~/services/invoice/model'

import { InvoiceCustomerPicker } from './invoice-customer-picker'
import { InvoicePlaceholder } from './invoice-placeholder'
import { InvoiceTextarea } from './invoice-textarea'

interface Props {
    customers: Customer[]
}

export const InvoiceAddresses = memo(({ customers }: Props) => {
    const { register } = useFormContext<InvoiceFormValues>()
    const { isFieldTouched, handleTouch } = useInvoiceTouchedFields()

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 w-full">
                <p className="text-[11px] text-muted-foreground font-mono">From:</p>
                {!isFieldTouched('from') ? (
                    <InvoiceTextarea
                        autoFocus
                        register={register}
                        name="from"
                        className="!text-[11px] placeholder:text-[11px] font-mono h-24"
                        onBlur={() => handleTouch('from')}
                    />
                ) : (
                    <InvoicePlaceholder className="h-24 w-full" onClick={() => handleTouch('from')} />
                )}
            </div>

            <div className="flex flex-col gap-2 w-full">
                <p className="text-[11px] text-muted-foreground font-mono">To:</p>
                <InvoiceCustomerPicker customers={customers} />
            </div>
        </div>
    )
})

InvoiceAddresses.displayName = 'InvoiceAddresses'
