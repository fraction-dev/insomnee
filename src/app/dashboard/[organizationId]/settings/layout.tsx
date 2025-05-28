import { ReactNode } from 'react'

export default async function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col gap-8 max-w-xl">
            {/* <SettingsTabs organizationId={organizationId} /> */}
            {children}
        </div>
    )
}
