import { redirect } from 'next/navigation'
import { PropsWithChildren, ReactNode } from 'react'

import { ROUTES } from '~/config/routes'
import { withAuth } from '~/lib/shared/with-auth'
import { getUserOrganizations } from '~/services/organization'

export function WithOrganization(PageComponent: (props: PropsWithChildren) => ReactNode) {
    return async function OrganizationPageWrapper({ children }: PropsWithChildren) {
        const { user } = await withAuth()

        if (!user) {
            redirect(ROUTES.AUTH)
        }

        const organizations = await getUserOrganizations(user.id)

        if (!organizations.length) {
            redirect(ROUTES.ORGANIZATION.CREATE)
        }

        return <PageComponent>{children}</PageComponent>
    }
}
