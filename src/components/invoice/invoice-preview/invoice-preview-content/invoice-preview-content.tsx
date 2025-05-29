import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import { AnimatedNumber } from '~/components/ui/animated-number'
import { Separator } from '~/components/ui/separator'
import { formatCurrency } from '~/lib/currency/format-currency'
import { calculateInvoiceAmounts } from '~/lib/invoice/calculate-invoice-amounts'
import { Invoice } from '~/services/invoice/model'

interface Props {
    invoice: Invoice
}

export const InvoicePreviewContent = ({ invoice }: Props) => {
    const { subtotal, total } = calculateInvoiceAmounts(invoice)

    return (
        <div className="border border-border min-h-96 shadow-2xl font-mono p-4 sm:p-6 md:p-8 flex flex-col gap-6">
            <div className="flex gap-12 justify-between items-center">
                <div className="flex flex-col gap-6">
                    <h3 className="text-xl font-medium">{invoice.title}</h3>
                    <div className="flex flex-col gap-1">
                        <ParagraphItem label="Invoice No" value={invoice.number} />
                        <ParagraphItem label="Issue Date" value={dayjs(invoice.issueDate).format(invoice.dateFormat)} />
                        <ParagraphItem label="Due Date" value={dayjs(invoice.dueDate).format(invoice.dateFormat)} />
                    </div>
                </div>

                {invoice.imageUrl && (
                    <Image src={invoice.imageUrl} alt="Invoice Logo" width={60} height={60} className="justify-self-end" />
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <AddressField label="From" value={invoice.from} />
                <AddressField
                    label="To"
                    value={
                        <div className="flex flex-col gap-1">
                            <p className="text-black text-[11px] leading-relaxed">{invoice.customer?.name}</p>
                            <Link
                                href={`mailto:${invoice.customer?.email}`}
                                className="text-black text-[11px] leading-relaxed underline w-fit"
                            >
                                {invoice.customer?.email}
                            </Link>
                            <Link
                                href={`tel:${invoice.customer?.phoneNumber}`}
                                className="text-black text-[11px] leading-relaxed underline w-fit"
                            >
                                {invoice.customer?.phoneNumber}
                            </Link>
                        </div>
                    }
                />
            </div>

            <div className="flex flex-col gap-2">
                <div className="grid grid-cols-4 gap-4 pb-2 border-b border-border">
                    <p className="text-[11px] text-muted-foreground">Description</p>
                    <p className="text-[11px] text-muted-foreground">Quantity</p>
                    <p className="text-[11px] text-muted-foreground">Price</p>
                    <p className="text-[11px] text-muted-foreground text-right">Total</p>
                </div>

                <div className="flex flex-col gap-4">
                    {invoice.items.map((item, idx) => (
                        <div
                            key={idx}
                            className="grid grid-cols-4 gap-4 border-b border-border border-dashed pb-2 last:border-b-0 last:pb-0"
                        >
                            <p className="text-black text-[11px] leading-relaxed">{item.description || '-'}</p>
                            <p className="text-black text-[11px] leading-relaxed">{item.quantity || '0'}</p>
                            <p className="text-black text-[11px] leading-relaxed">{item.price || '0'}</p>
                            <p className="text-black text-[11px] leading-relaxed text-right">
                                {formatCurrency(item.price * item.quantity, invoice.currency || 'USD')}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-4">
                <div className="col-span-2" />
                <div className="col-span-2 font-mono flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-[11px] text-muted-foreground">Subtotal</div>
                        <div className="text-[11px] text-muted-foreground justify-self-end">
                            {formatCurrency(subtotal, invoice.currency || 'USD')}
                        </div>

                        {/* <div className="text-[11px] text-muted-foreground">VAT (0%)</div>
                        <div className="text-[11px] text-muted-foreground justify-self-end">
                            {formatCurrency(0, invoice.currency || 'USD')}
                        </div>

                        <div className="text-[11px] text-muted-foreground">Discount (0%)</div>
                        <div className="text-[11px] text-muted-foreground justify-self-end">
                            {formatCurrency(0, invoice.currency || 'USD')}
                        </div> */}
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4 items-center">
                        <div className="text-[11px] text-muted-foreground">Total</div>
                        <div className="text-base text-primary justify-self-end">
                            <AnimatedNumber value={total} currency={invoice.currency || 'USD'} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-40">
                <div className="grid grid-cols-2 gap-12">
                    <div className="flex flex-col gap-2">
                        <p className="text-[11px] text-muted-foreground">Payment Details</p>
                        <p className="text-black text-[11px] leading-relaxed">{invoice.paymentDetails || '-'}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-[11px] text-muted-foreground">Notes</p>
                        <p className="text-black text-[11px] leading-relaxed">{invoice.notes || '-'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ParagraphItem = ({ label, value }: { label: string; value: string }) => {
    return (
        <p className="text-[11px] text-muted-foreground">
            {label}: <span className="text-black">{value}</span>
        </p>
    )
}

const AddressField = ({ label, value }: { label: string; value: string | ReactNode }) => {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-[11px] text-muted-foreground">{label}</p>
            {typeof value === 'string' ? <p className="text-black text-[11px] leading-relaxed">{value}</p> : value}
        </div>
    )
}
