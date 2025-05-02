import { Metadata } from 'next'

import { WithAuth } from '~/components/app/with-auth'
import { OrganizationCreateView } from '~/components/organizations/organization-create-view'

export const metadata: Metadata = {
    title: 'Create Organization | Insomnee',
    description: 'Create a new organization',
}

export default WithAuth(function Page() {
    return (
        <div className="max-w-md mx-auto">
            <OrganizationCreateView />
        </div>
    )
})
