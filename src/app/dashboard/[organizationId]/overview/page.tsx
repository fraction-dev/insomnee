import { Metadata } from 'next'

import { OverviewView } from '~/components/overview/overview-view'
import { getOrganizationById } from '~/services/organization'

export const metadata: Metadata = {
    title: 'Overview | Insomnee',
    description: 'Insomnee is a platform that helps you manage your business',
}

export default async function Page({ params }: { params: { organizationId: string } }) {
    const organizationId = params.organizationId

    const organization = await getOrganizationById(organizationId)

    return <OverviewView organization={organization} />
}
