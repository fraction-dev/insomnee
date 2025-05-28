import { getOrganizationById } from '~/services/organization'
import { InvoicesView } from '~/views/invoices.view'

export default async function Page({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params

    const organization = await getOrganizationById(organizationId)

    return <InvoicesView organization={organization} />
}
