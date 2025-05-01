import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { DashboardNavbar } from '~/components/dashboard/dashboard-navbar'
import { DashboardSidebar } from '~/components/dashboard/dashboard-sidebar'
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'
import { ROUTES } from '~/config/routes'
import { withAuth } from '~/lib/with-auth'

export default async function DashboardLayout({ children, params }: { children: ReactNode; params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params
    const { user } = await withAuth()

    if (!user) {
        redirect(ROUTES.AUTH.INDEX)
    }

    return (
        <SidebarProvider>
            <DashboardSidebar organizationId={organizationId} user={user} />
            <SidebarInset className="max-w-full p-4">
                <div className="mb-4">
                    <DashboardNavbar organizationId={organizationId} />
                </div>

                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
