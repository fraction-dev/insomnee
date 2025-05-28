import { useForm } from 'react-hook-form'

import { Select } from '~/components/shared/select'
import { CURRENCIES } from '~/lib/consts/currencies'
import { InvoiceFormValues } from '~/services/invoice/model'

interface Props {
    form: ReturnType<typeof useForm<InvoiceFormValues>>
}

export const InvoiceCurrencyPicker = ({ form }: Props) => {
    return (
        <div className="flex justify-end">
            <Select
                withSearch
                options={CURRENCIES.map((currency) => ({ label: currency.code, value: currency.code }))}
                value={form.watch('currency')}
                placeholder="Select currency"
                onChange={(value) => form.setValue('currency', value)}
            >
                <div className="text-muted-foreground text-[11px]">{form.watch('currency') || 'USD'}</div>
            </Select>
        </div>
    )
}
