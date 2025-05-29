import { UserCard } from '~/components/shared/user-card'
import { Invoice } from '~/services/invoice/model'

import { InvoiceStatusBadge } from '../invoice-status-badge'

interface Props {
    invoice: Invoice
}

export const InvoiceDetailsHeader = ({ invoice }: Props) => {
    return (
        <div className="flex items-center justify-between gap-12">
            <UserCard name={invoice.customer?.name ?? invoice.customer?.email ?? ''} />
            <InvoiceStatusBadge status={invoice.status} />
        </div>
    )
}
