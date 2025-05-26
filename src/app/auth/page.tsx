import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { AuthLoginView } from '~/components/auth/auth-login-view'
import { ROUTES } from '~/config/routes'
import { withAuth } from '~/lib/shared/with-auth'
import { getUserOrganizations } from '~/services/organization'

export const metadata: Metadata = {
    title: 'Login | Insomnee',
    description: 'Login to your Insomnee account',
}

export default async function Page() {
    const { user } = await withAuth()

    if (!user) {
        return <AuthLoginView />
    }

    const organizations = await getUserOrganizations(user.id)

    if (organizations.length === 1) {
        redirect(ROUTES.DASHBOARD.OVERVIEW(organizations[0].id))
    }

    if (organizations.length > 1) {
        redirect(ROUTES.DASHBOARD.INDEX)
    }

    redirect(ROUTES.ORGANIZATION.CREATE)
}
