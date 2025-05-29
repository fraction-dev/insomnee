import { redirect } from 'next/navigation'
import { getInvoiceById } from 'prisma/services/invoice'

import { ROUTES } from '~/config/routes'
import logger from '~/core/logger'
import { InvoiceView } from '~/views/invoice.view'

export default async function Page({ params }: { params: Promise<{ invoiceId: string }> }) {
    const { invoiceId } = await params

    let invoice
    try {
        invoice = await getInvoiceById(invoiceId)
    } catch (_err) {
        logger.error('Invoice not found', { invoiceId })
        redirect(ROUTES.AUTH)
    }

    if (!invoice) {
        redirect(ROUTES.AUTH)
    }

    return <InvoiceView invoice={invoice} />
}
