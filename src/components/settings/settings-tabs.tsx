'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ROUTES } from '~/config/routes'
import { cn } from '~/lib/utils'

import { ScrollArea, ScrollBar } from '../ui/scroll-area'

const SECTIONS = (organizationId: string) => [
    {
        title: 'General',
        href: ROUTES.DASHBOARD.SETTINGS.INDEX(organizationId),
    },
    {
        title: 'Agents',
        href: ROUTES.DASHBOARD.SETTINGS.AGENTS(organizationId),
    },
    {
        title: 'Categories',
        href: ROUTES.DASHBOARD.SETTINGS.CATEGORIES(organizationId),
    },
    {
        title: 'Members',
        href: ROUTES.DASHBOARD.SETTINGS.MEMBERS(organizationId),
    },
    {
        title: 'Notifications',
        href: ROUTES.DASHBOARD.SETTINGS.NOTIFICATIONS(organizationId),
    },
]

export const SettingsTabs = ({ organizationId }: { organizationId: string }) => {
    const pathname = usePathname()

    return (
        <ScrollArea className="max-w-screen w-full">
            <div className="flex w-full items-center gap-6 pb-4 md:pb-0">
                {SECTIONS(organizationId).map((section) => (
                    <Link
                        key={section.href}
                        href={section.href}
                        className={cn('text-muted-foreground text-sm font-normal', {
                            'text-black': pathname === section.href,
                        })}
                    >
                        {section.title}
                    </Link>
                ))}
            </div>

            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}
