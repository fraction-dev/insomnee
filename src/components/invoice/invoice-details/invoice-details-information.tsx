import { formatDateToReadableString } from '~/lib/date'
import { Invoice } from '~/services/invoice/model'

interface Props {
    invoice: Invoice
}

export const InvoiceDetailsInformation = ({ invoice }: Props) => {
    return (
        <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">Issue Date</p>
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="text-sm text-muted-foreground">Invoice No.</p>
            </div>

            <div className="flex flex-col gap-4 justify-self-end">
                <p className="text-sm text-neutral-600 text-right">{formatDateToReadableString(invoice.issueDate)}</p>
                <p className="text-sm text-neutral-600 text-right">{formatDateToReadableString(invoice.dueDate)}</p>
                <p className="text-sm text-neutral-600 text-right">{invoice.number}</p>
            </div>
        </div>
    )
}
