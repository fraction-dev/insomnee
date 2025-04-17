import { WithAuth } from '~/components/app/with-auth'
import { OrganizationCreateView } from '~/components/organizations/organization-create-view'

export default WithAuth(function Page() {
    return (
        <div className="max-w-md mx-auto">
            <OrganizationCreateView />
        </div>
    )
})
