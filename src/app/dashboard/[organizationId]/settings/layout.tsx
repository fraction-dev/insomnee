import { ReactNode } from 'react'

export default async function Layout({ children, params }: { children: ReactNode; params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params

    return (
        <div className="flex flex-col gap-8 max-w-xl">
            {/* <SettingsTabs organizationId={organizationId} /> */}
            {children}
        </div>
    )
}
