import { Metadata } from 'next'

import { SettingsGeneralView } from '~/components/settings/settings-general/settings-general-view'

export const metadata: Metadata = {
    title: 'General Settings | Insomnee',
    description: 'Manage your general settings',
}

export default async function Page({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params

    return <SettingsGeneralView organizationId={organizationId} />
}
