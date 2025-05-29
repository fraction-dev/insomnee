import { Metadata } from 'next'

import { getOrganizationById } from '~/services/organization'
import { OverviewView } from '~/views/overview.view'

export const metadata: Metadata = {
    title: 'Overview | Insomnee',
    description: 'Insomnee is a platform that helps you manage your business',
}

export default async function Page({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params

    const organization = await getOrganizationById(organizationId)

    return <OverviewView organization={organization} />
}
