import { redirect } from 'next/navigation'

import { DashboardNavbar } from '~/components/dashboard/dashboard-navbar'
import { DashboardSidebar } from '~/components/dashboard/dashboard-sidebar'
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'
import { ROUTES } from '~/config/routes'
import { withAuth } from '~/lib/with-auth'
import { getOrganizationById } from '~/services/organization'

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ organizationId: string }>
}) {
    const { organizationId } = await params
    const organization = await getOrganizationById(organizationId)
    const { user } = await withAuth()

    if (!user) {
        redirect(ROUTES.AUTH.INDEX)
    }

    return (
        <SidebarProvider>
            <DashboardSidebar organization={organization} user={user} />
            <SidebarInset className="max-w-full p-4">
                <div className="mb-4">
                    <DashboardNavbar />
                </div>

                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
