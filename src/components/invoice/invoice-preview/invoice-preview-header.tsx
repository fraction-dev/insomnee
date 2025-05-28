import { UserCard } from '~/components/shared/user-card'
import { Invoice } from '~/services/invoice/model'

import { InvoiceStatusBadge } from '../invoice-status-badge'

interface Props {
    invoice: Invoice
}

export const InvoicePreviewHeader = ({ invoice }: Props) => {
    return (
        <div className="flex items-center justify-between">
            <UserCard name={invoice.customer?.name ?? invoice.customer?.email ?? ''} />
            <InvoiceStatusBadge status={invoice.status} />
        </div>
    )
}
