import { redirect } from 'next/navigation'

import { WithAuth } from '~/components/app/with-auth'
import { WithOrganization } from '~/components/app/with-organization'
import { ROUTES } from '~/config/routes'
import { withAuth } from '~/lib/shared/with-auth'
import { getUserOrganizations } from '~/services/organization'

export default WithAuth(
    WithOrganization(async function Page() {
        const { user } = await withAuth()

        if (!user) {
            redirect(ROUTES.AUTH)
        }

        const organizations = await getUserOrganizations(user.id)

        if (organizations.length > 0) {
            redirect(ROUTES.DASHBOARD.OVERVIEW(organizations[0].id))
        }

        return null
    }),
)
