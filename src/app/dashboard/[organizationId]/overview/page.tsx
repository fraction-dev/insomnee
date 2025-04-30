import { OverviewView } from '~/components/overview/overview-view'
import { getOrganizationById } from '~/services/organization'

export default async function Page({ params }: { params: { organizationId: string } }) {
    const organizationId = params.organizationId

    const organization = await getOrganizationById(organizationId)

    return <OverviewView organization={organization} />
}
