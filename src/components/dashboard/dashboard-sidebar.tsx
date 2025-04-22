'use client'

import { Bot, ChartNoAxesColumn, Command, CreditCard, Currency, LifeBuoy, LinkIcon, Send, Settings2 } from 'lucide-react'
import * as React from 'react'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '~/components/ui/sidebar'
import { ROUTES } from '~/config/routes'
import { Organization } from '~/services/organization/model'
import { User } from '~/services/user/model'

import Link from 'next/link'
import { SidebarNavMain } from '../sidebar/sidebar-nav-main'
import { SidebarNavSecondary } from '../sidebar/sidebar-nav-secondary'
import { SidebarNavUser } from '../sidebar/sidebar-nav-user'

// This is sample data.
const data = (organizationId: string) => ({
    navMain: [
        {
            title: 'Overview',
            url: ROUTES.DASHBOARD.OVERVIEW(organizationId),
            icon: ChartNoAxesColumn,
            isActive: true,
        },
        {
            title: 'Agents',
            url: '#',
            icon: Bot,
            items: [
                {
                    title: 'Always On Time',
                    url: '#',
                },
                {
                    title: 'Cost Reduction',
                    url: '#',
                },
                {
                    title: 'Clients Parser',
                    url: '#',
                },
                {
                    title: 'Competitors Parser',
                    url: '#',
                },
                {
                    title: 'Lead Generation',
                    url: '#',
                },
            ],
        },
        {
            title: 'Digital Marketing',
            url: '#',
            icon: Currency,
            items: [
                {
                    title: 'Story Generation',
                    url: '#',
                },
                {
                    title: 'Posts Generation',
                    url: '#',
                },
                {
                    title: 'Account Analysis',
                    url: '#',
                },
                {
                    title: 'Content Analysis',
                    url: '#',
                },
            ],
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
        },
        {
            title: 'Transactions',
            url: ROUTES.DASHBOARD.TRANSACTIONS(organizationId),
            icon: CreditCard,
        },
        {
            title: 'Integrations',
            url: ROUTES.DASHBOARD.INTEGRATIONS(organizationId),
            icon: LinkIcon,
        },
    ],
    navSecondary: [
        {
            title: 'Support',
            url: '#',
            icon: LifeBuoy,
        },
        {
            title: 'Feedback',
            url: '#',
            icon: Send,
        },
    ],
})

interface Props {
    organization: Organization
    user: User
}

export function DashboardSidebar({ organization, user, ...props }: Props & React.ComponentProps<typeof Sidebar>) {
    const sidebarData = React.useMemo(() => data(organization.id), [organization.id])

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg">
                            <Link href={ROUTES.DASHBOARD.OVERVIEW(organization.id)}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{organization.name}</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarNavMain items={sidebarData.navMain} />
                <SidebarNavSecondary items={sidebarData.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <SidebarNavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}
