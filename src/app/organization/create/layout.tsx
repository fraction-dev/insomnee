import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { OnboardingNavbar } from '~/components/navbar/onboarding-navbar'
import { ROUTES } from '~/config/routes'
import { withAuth } from '~/lib/with-auth'

export default async function OrganizationCreateLayout({ children }: { children: ReactNode }) {
    const { user } = await withAuth()

    if (!user) {
        redirect(ROUTES.AUTH.INDEX)
    }

    return (
        <div className="min-h-screen py-12">
            <OnboardingNavbar user={user} />
            <div className="flex flex-col max-w-sm mx-auto h-[calc(100vh-12rem)] justify-center py-24">{children}</div>
        </div>
    )
}
