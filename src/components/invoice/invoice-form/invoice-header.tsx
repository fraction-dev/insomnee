import dayjs from 'dayjs'
import { useFormContext } from 'react-hook-form'

import { DatePicker } from '~/components/shared/date-picker'
import { useInvoiceTouchedFields } from '~/hooks/invoice/useInvoiceTouchedFields'
import { InvoiceFormValues } from '~/services/invoice/model'

import { InvoiceInput } from './invoice-input'
import { InvoiceLogo } from './invoice-logo'
import { InvoicePlaceholder } from './invoice-placeholder'

export const InvoiceHeader = () => {
    const { register, watch, setValue } = useFormContext<InvoiceFormValues>()
    const { isFieldTouched, handleTouch } = useInvoiceTouchedFields()

    return (
        <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2 w-full">
                {!isFieldTouched('title') ? (
                    <InvoiceInput
                        autoFocus
                        register={register}
                        name="title"
                        className="!text-xl font-mono"
                        onBlur={() => handleTouch('title')}
                    />
                ) : (
                    <InvoicePlaceholder className="h-7" onClick={() => handleTouch('title')} />
                )}

                <div className="flex items-center gap-1 w-full">
                    <p className="text-[11px] text-muted-foreground font-mono">Invoice No:</p>
                    {!isFieldTouched('number') ? (
                        <InvoiceInput
                            autoFocus
                            register={register}
                            name="number"
                            className="!text-[11px] font-mono w-fit"
                            onBlur={() => handleTouch('number')}
                        />
                    ) : (
                        <InvoicePlaceholder className="h-4 w-24" onClick={() => handleTouch('number')} />
                    )}
                </div>

                <div className="flex items-center gap-1 w-full">
                    <p className="text-[11px] text-muted-foreground font-mono">Issue Date:</p>

                    <DatePicker value={watch('issueDate')} onChange={(date) => setValue('issueDate', date)}>
                        <div className="text-[11px] text-primary font-mono cursor-pointer">
                            {watch('issueDate') ? dayjs(watch('issueDate')).format('DD/MM/YYYY') : dayjs().format('DD/MM/YYYY')}
                        </div>
                    </DatePicker>
                </div>

                <div className="flex items-center gap-1 w-full">
                    <p className="text-[11px] text-muted-foreground font-mono">Due Date:</p>
                    <DatePicker value={watch('dueDate')} onChange={(date) => setValue('dueDate', date)}>
                        <div className="text-[11px] text-primary font-mono cursor-pointer">
                            {watch('dueDate') ? dayjs(watch('dueDate')).format('DD/MM/YYYY') : dayjs().format('DD/MM/YYYY')}
                        </div>
                    </DatePicker>
                </div>
            </div>

            {/* <InvoicePlaceholder className="h-24 w-24 justify-self-end" /> */}
            <InvoiceLogo />
        </div>
    )
}
