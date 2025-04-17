import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

import { ROUTES } from '~/config/routes'
import { withAuth } from '~/lib/with-auth'
import { getUserOrganizations } from '~/services/organization'

export function WithOrganization(PageComponent: (props: PropsWithChildren) => React.ReactNode) {
    return async function OrganizationPageWrapper({ children }: PropsWithChildren) {
        const { user } = await withAuth()

        if (!user) {
            redirect(ROUTES.AUTH.INDEX)
        }

        const organizations = await getUserOrganizations(user.id)

        if (!organizations.length) {
            redirect(ROUTES.ORGANIZATION.CREATE)
        }

        return <PageComponent>{children}</PageComponent>
    }
}
