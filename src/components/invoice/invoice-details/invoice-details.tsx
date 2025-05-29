import { Separator } from '~/components/ui/separator'
import { Invoice } from '~/services/invoice/model'

import { InvoiceDetailsActions } from './invoice-details-actions'
import { InvoiceDetailsActivityAccordion } from './invoice-details-activity-accordion'
import { InvoiceDetailsHeader } from './invoice-details-header'
import { InvoiceDetailsInformation } from './invoice-details-information'
import { InvoiceDetailsInternalNotesAccordion } from './invoice-details-internal-notes-accordion'
import { InvoiceDetailsLink } from './invoice-details-link'
import { InvoiceDetailsTotal } from './invoice-details-total'

interface Props {
    organizationId: string
    invoice: Invoice
}

export const InvoiceDetails = ({ organizationId, invoice }: Props) => {
    return (
        <div className="flex flex-col gap-6">
            <InvoiceDetailsHeader invoice={invoice} />
            <InvoiceDetailsTotal invoice={invoice} />
            <InvoiceDetailsActions organizationId={organizationId} invoice={invoice} />
            <Separator />
            <InvoiceDetailsInformation invoice={invoice} />
            <Separator />
            <InvoiceDetailsLink invoice={invoice} />
            <div className="flex flex-col">
                <InvoiceDetailsActivityAccordion invoice={invoice} />
                <InvoiceDetailsInternalNotesAccordion organizationId={organizationId} invoice={invoice} />
            </div>
        </div>
    )
}
