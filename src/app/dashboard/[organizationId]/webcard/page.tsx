import { WebcardView } from '~/components/webcard/webcard-view'
import { getOrganizationById } from '~/services/organization'

export default async function Page({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params
    const organization = await getOrganizationById(organizationId)

    return <WebcardView organization={organization} />
}
