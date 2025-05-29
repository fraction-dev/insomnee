import { useFormContext } from 'react-hook-form'

import { Combobox } from '~/components/ui/combobox'
import { Customer } from '~/services/customer/model'
import { InvoiceFormValues } from '~/services/invoice/model'

interface Props {
    customers: Customer[]
}

export const InvoiceCustomerPicker = ({ customers }: Props) => {
    const { watch, setValue } = useFormContext<InvoiceFormValues>()

    const customerId = watch('customerId')
    const customer = customers.find((customer) => customer.id === customerId)

    return (
        <div className="h-24">
            <Combobox
                placeholder="Choose customer"
                displayValue={
                    <div className="flex flex-col gap-1">
                        <p className="text-[11px] text-black dark:text-neutral-50 font-mono">{customer?.name}</p>
                        <p className="text-[11px] text-black dark:text-neutral-50 font-mono">{customer?.email}</p>
                        <p className="text-[11px] text-black dark:text-neutral-50 font-mono">{customer?.phoneNumber}</p>
                    </div>
                }
                options={customers.map((customer) => ({ label: customer.name, value: customer.id }))}
                value={customerId}
                onChange={(value) => setValue('customerId', value)}
            />
        </div>
    )
}
