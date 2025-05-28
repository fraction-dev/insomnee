import { AnimatedNumber } from '~/components/ui/animated-number'
import { formatDateToReadableString } from '~/lib/date'
import { calculateInvoiceAmounts } from '~/lib/invoice/calculate-invoice-amounts'
import { Invoice } from '~/services/invoice/model'

interface Props {
    invoice: Invoice
}

export const InvoiceDetailsTotal = ({ invoice }: Props) => {
    const { subtotal } = calculateInvoiceAmounts(invoice)

    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-mono text-2xl">
                <AnimatedNumber value={subtotal} currency={invoice.currency ?? 'USD'} />
            </h3>

            {invoice.status === 'PAID' && (
                <p className="text-xs text-muted-foreground">Paid at {formatDateToReadableString(invoice.paidAt ?? null)}</p>
            )}
        </div>
    )
}
