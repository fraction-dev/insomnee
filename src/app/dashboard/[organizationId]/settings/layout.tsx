import { ReactNode } from 'react'

import { SettingsTabs } from '~/components/settings/settings-tabs'

export default function Layout({ children, params }: { children: ReactNode; params: { organizationId: string } }) {
    return (
        <div className="flex flex-col gap-8 max-w-xl">
            <SettingsTabs organizationId={params.organizationId} />
            {children}
        </div>
    )
}
