'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROUTES } from '~/config/routes'
import { cn } from '~/lib/utils'

const SECTIONS = (organizationId: string) => [
    {
        title: 'General',
        href: ROUTES.DASHBOARD.SETTINGS(organizationId),
    },
    {
        title: 'Agents',
        href: ROUTES.DASHBOARD.AGENTS(organizationId),
    },
    {
        title: 'Categories',
        href: ROUTES.DASHBOARD.SETTINGS_CATEGORIES(organizationId),
    },
    {
        title: 'Members',
        href: ROUTES.DASHBOARD.SETTINGS_MEMBERS(organizationId),
    },
    {
        title: 'Notifications',
        href: ROUTES.DASHBOARD.SETTINGS_NOTIFICATIONS(organizationId),
    },
]

export const SettingsTabs = ({ organizationId }: { organizationId: string }) => {
    const pathname = usePathname()

    return (
        <div className="flex w-full items-center gap-6">
            {SECTIONS(organizationId).map((section) => (
                <Link
                    href={section.href}
                    className={cn('text-muted-foreground text-sm font-normal', {
                        'text-black': pathname === section.href,
                    })}
                >
                    {section.title}
                </Link>
            ))}
        </div>
    )
}
