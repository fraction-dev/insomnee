import { Metadata } from 'next'

import { SettingsAgentsView } from '~/components/settings/settings-agents/settings-agents-view'

export const metadata: Metadata = {
    title: 'Agents | Insomnee',
    description: 'Manage your agents',
}

export default async function Page({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params

    return (
        <>
            <SettingsAgentsView organizationId={organizationId} />
        </>
    )
}
