import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { IntegrationsView } from '~/components/integration/integrations-view'
import { env } from '~/config/env'
import { ROUTES } from '~/config/routes'
import { withAuth } from '~/lib/with-auth'
import { getOrganizationIntegrations } from '~/services/integration'

const ENV_CREDENTIALS = {
    INSTAGRAM_APP_ID: env.INSTAGRAM_APP_ID,
}

export const metadata: Metadata = {
    title: 'Integrations | Insomnee',
    description: 'Manage your integrations with Insomnee',
}

export default async function Page({ params }: { params: Promise<{ organizationId: string }> }) {
    const { user } = await withAuth()
    const { organizationId } = await params

    const integrations = await getOrganizationIntegrations(organizationId)

    if (!user) {
        redirect(ROUTES.AUTH.INDEX)
    }

    return (
        <IntegrationsView
            integrations={integrations}
            instagramAppId={ENV_CREDENTIALS.INSTAGRAM_APP_ID}
            organizationId={organizationId as string}
        />
    )
}
