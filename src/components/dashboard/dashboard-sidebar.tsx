'use client'

import { BotIcon, ChartNoAxesColumn, CreditCard, FileDigitIcon, FolderOpen, LifeBuoy, Send, Settings2, Users2Icon } from 'lucide-react'
import Link from 'next/link'
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
import { useOrganization } from '~/hooks/organization/useOrganization'
import { getInitials } from '~/lib/strings'
import { User } from '~/services/user/model'

import { SidebarNavMain } from '../sidebar/sidebar-nav-main'
import { SidebarNavSecondary } from '../sidebar/sidebar-nav-secondary'
import { SidebarNavUser } from '../sidebar/sidebar-nav-user'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Skeleton } from '../ui/skeleton'

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
            url: ROUTES.DASHBOARD.AGENTS.INDEX(organizationId),
            icon: BotIcon,
            isActive: true,
            items: [
                {
                    title: 'Leads generation',
                    url: ROUTES.DASHBOARD.AGENTS.LEAD_GENERATION(organizationId),
                },
                // {
                //     title: 'Cost Reduction',
                //     url: '#',
                // },
                // {
                //     title: 'Clients Parser',
                //     url: '#',
                // },
                // {
                //     title: 'Competitors Parser',
                //     url: '#',
                // },
                // {
                //     title: 'Lead Generation',
                //     url: '#',
                // },
            ],
        },
        {
            title: 'Customers',
            url: ROUTES.DASHBOARD.CUSTOMERS(organizationId),
            icon: Users2Icon,
        },
        {
            title: 'Invoices',
            url: ROUTES.DASHBOARD.INVOICES(organizationId),
            icon: FileDigitIcon,
        },
        {
            title: 'Vault',
            url: ROUTES.DASHBOARD.VAULT(organizationId),
            icon: FolderOpen,
        },
        {
            title: 'Transactions',
            url: ROUTES.DASHBOARD.TRANSACTIONS(organizationId),
            icon: CreditCard,
        },
        {
            title: 'Settings',
            url: ROUTES.DASHBOARD.SETTINGS.INDEX(organizationId),
            icon: Settings2,
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
    organizationId: string
    user: User
}

export function DashboardSidebar({ organizationId, user, ...props }: Props & React.ComponentProps<typeof Sidebar>) {
    const { data: organizationData, isLoading } = useOrganization(organizationId)

    const organization = organizationData?.data

    const sidebarData = React.useMemo(() => data(organization?.id ?? ''), [organization?.id])

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg">
                            {isLoading || !organization ? (
                                <Skeleton className="h-8 w-full" />
                            ) : (
                                <Link href={ROUTES.DASHBOARD.OVERVIEW(organization.id)}>
                                    <Avatar>
                                        <AvatarImage src={organization.logoUrl ?? undefined} />
                                        <AvatarFallback className="bg-neutral-200">
                                            {getInitials(organization.name, { maxInitials: 2 })}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold dark:text-neutral-50">{organization.name}</span>
                                    </div>
                                </Link>
                            )}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {isLoading || !organization ? (
                    <div className="flex flex-col gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ) : (
                    <>
                        <SidebarNavMain items={sidebarData.navMain} />
                        <SidebarNavSecondary items={sidebarData.navSecondary} className="mt-auto" />
                    </>
                )}
            </SidebarContent>
            <SidebarFooter>
                <SidebarNavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}
