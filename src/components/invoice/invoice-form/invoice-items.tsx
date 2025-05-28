import { last } from 'lodash'
import { PlusIcon, XIcon } from 'lucide-react'
import { ChangeEvent, memo, useCallback } from 'react'
import { FieldValues, Path, useFieldArray, useFormContext } from 'react-hook-form'

import { AnimatedNumber } from '~/components/ui/animated-number'
import { Separator } from '~/components/ui/separator'
import { useInvoiceItemsTouchedFields } from '~/hooks/invoice/useInvoiceItemsTouchedFields'
import { formatCurrency } from '~/lib/currency/format-currency'
import { InvoiceFormValues } from '~/services/invoice/model'

import { InvoiceInput } from './invoice-input'
import { InvoicePlaceholder } from './invoice-placeholder'

type ArrayFieldPath<T extends FieldValues, K extends keyof T> =
    T[K] extends Array<infer U> ? `${K & string}.${number}.${keyof U & string}` : never

type FormFieldPath = Path<InvoiceFormValues> | ArrayFieldPath<InvoiceFormValues, 'items'>

export const InvoiceItems = memo(() => {
    const form = useFormContext<InvoiceFormValues>()
    const { fields, append, remove } = useFieldArray<InvoiceFormValues>({
        control: form.control,
        name: 'items' as const,
    })

    const { isFieldTouched, handleTouch } = useInvoiceItemsTouchedFields()

    const addNewItem = useCallback(() => {
        append({ description: '', quantity: 0, price: 0 })
    }, [append])

    const calculateSubtotal = useCallback(() => {
        return fields.reduce((sum, _, index) => {
            const quantity = form.watch(`items.${index}.quantity`) ?? 0
            const price = form.watch(`items.${index}.price`) ?? 0
            return sum + quantity * price
        }, 0)
    }, [fields, form])

    const calculateVAT = useCallback(
        (subtotal: number) => {
            const vatRate = form.watch('vat') ?? 0
            return subtotal * (vatRate / 100)
        },
        [form],
    )

    const calculateDiscount = useCallback(
        (subtotal: number) => {
            const discountRate = form.watch('discount') ?? 0
            return subtotal * (discountRate / 100)
        },
        [form],
    )

    const subtotal = calculateSubtotal()
    const vat = calculateVAT(subtotal)
    const discount = calculateDiscount(subtotal)
    const total = subtotal + vat - discount

    const handleFieldChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>, index: number, field: keyof InvoiceFormValues['items'][number]) => {
            /**
             * Transform the value to number if the field is quantity or price
             */
            const value = event.target.value

            if (field === 'quantity' || field === 'price') {
                form.setValue(`items.${index}.${field}`, Number(value))
            } else {
                form.setValue(`items.${index}.${field}`, value as string)
            }
        },
        [form],
    )

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <div className="grid grid-cols-4 gap-4 font-mono">
                    <div className="text-[11px] text-muted-foreground">Description</div>
                    <div className="text-[11px] text-muted-foreground">Quantity</div>
                    <div className="text-[11px] text-muted-foreground">Price</div>
                    <div className="text-[11px] text-muted-foreground text-right">Total</div>
                </div>

                {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-4 gap-4 items-start relative">
                        {!isFieldTouched(index, 'description') ? (
                            <InvoiceInput
                                autoFocus
                                register={form.register}
                                name={`items.${index}.description` as FormFieldPath}
                                className="!text-[11px] placeholder:text-[11px] font-mono"
                                onBlur={() => handleTouch(index, 'description')}
                            />
                        ) : (
                            <InvoicePlaceholder className="h-6" onClick={() => handleTouch(index, 'description')} />
                        )}

                        {!isFieldTouched(index, 'quantity') ? (
                            <InvoiceInput
                                autoFocus
                                type="number"
                                register={form.register}
                                min={0}
                                name={`items.${index}.quantity` as FormFieldPath}
                                className="!text-[11px] placeholder:text-[11px] font-mono"
                                onBlur={() => handleTouch(index, 'quantity')}
                                onChange={(e) => handleFieldChange(e, index, 'quantity')}
                            />
                        ) : (
                            <InvoicePlaceholder className="h-6" onClick={() => handleTouch(index, 'quantity')} />
                        )}

                        {!isFieldTouched(index, 'price') ? (
                            <InvoiceInput
                                autoFocus
                                type="number"
                                register={form.register}
                                name={`items.${index}.price` as FormFieldPath}
                                className="!text-[11px] placeholder:text-[11px] font-mono"
                                onBlur={() => handleTouch(index, 'price')}
                                onChange={(e) => handleFieldChange(e, index, 'price')}
                            />
                        ) : (
                            <InvoicePlaceholder className="h-6" onClick={() => handleTouch(index, 'price')} />
                        )}

                        <p className="text-[11px] font-mono text-right">
                            {formatCurrency(
                                (form.watch(`items.${index}.quantity`) ?? 0) * (form.watch(`items.${index}.price`) ?? 0),
                                form.watch('currency') ?? 'USD',
                            )}
                        </p>

                        {last(fields) && fields.length > 1 && (
                            <XIcon
                                className="size-3 text-muted-foreground absolute -right-6 top-[1px] cursor-pointer"
                                onClick={() => remove(index)}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-between">
                <div
                    className="text-[11px] font-light font-mono text-muted-foreground flex items-center gap-1 cursor-pointer"
                    onClick={addNewItem}
                >
                    <PlusIcon className="size-3" />
                    <p>Add Item</p>
                </div>
            </div>

            <div className="grid grid-cols-4">
                <div className="col-span-2" />
                <div className="col-span-2 font-mono flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-[11px] text-muted-foreground">Subtotal</div>
                        <div className="text-[11px] text-muted-foreground justify-self-end">
                            {formatCurrency(subtotal, form.watch('currency') ?? 'USD')}
                        </div>

                        {/* <div className="text-[11px] text-muted-foreground">VAT (0%)</div>
                        <div className="text-[11px] text-muted-foreground justify-self-end">
                            {formatCurrency(vat, form.watch('currency') ?? 'USD')}
                        </div>

                        <div className="text-[11px] text-muted-foreground">Discount (0%)</div>
                        <div className="text-[11px] text-muted-foreground justify-self-end">
                            {formatCurrency(discount, form.watch('currency') ?? 'USD')}
                        </div> */}
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4 items-center">
                        <div className="text-[11px] text-muted-foreground">Total</div>
                        <div className="text-base text-primary justify-self-end">
                            <AnimatedNumber value={total} currency={form.watch('currency') || 'USD'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

InvoiceItems.displayName = 'InvoiceItems'
