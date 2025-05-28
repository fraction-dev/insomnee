'use client'

import { upperCase } from 'lodash'
import {
    ChartNoAxesColumn,
    Command,
    CreditCard,
    FileDigitIcon,
    LifeBuoy,
    Send,
    Settings2,
    SquareChartGantt,
    Users2Icon,
} from 'lucide-react'
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
        // {
        //     title: 'Agents',
        //     url: '#',
        //     icon: Bot,
        //     items: [
        //         {
        //             title: 'Always On Time',
        //             url: '#',
        //         },
        //         {
        //             title: 'Cost Reduction',
        //             url: '#',
        //         },
        //         {
        //             title: 'Clients Parser',
        //             url: '#',
        //         },
        //         {
        //             title: 'Competitors Parser',
        //             url: '#',
        //         },
        //         {
        //             title: 'Lead Generation',
        //             url: '#',
        //         },
        //     ],
        // },
        // {
        //     title: 'Digital Marketing',
        //     url: '#',
        //     icon: Currency,
        //     items: [
        //         {
        //             title: 'Story Generation',
        //             url: '#',
        //         },
        //         {
        //             title: 'Posts Generation',
        //             url: '#',
        //         },
        //         {
        //             title: 'Account Analysis',
        //             url: '#',
        //         },
        //         {
        //             title: 'Content Analysis',
        //             url: '#',
        //         },
        //     ],
        // },
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
            title: 'Products & Services',
            url: ROUTES.DASHBOARD.PRODUCTS_AND_SERVICES(organizationId),
            icon: SquareChartGantt,
        },
        // {
        //     title: 'Messaging',
        //     url: ROUTES.DASHBOARD.MESSAGING(organizationId),
        //     icon: Send,
        // },
        {
            title: 'Transactions',
            url: ROUTES.DASHBOARD.TRANSACTIONS(organizationId),
            icon: CreditCard,
        },
        // {
        //     title: 'Integrations',
        //     url: ROUTES.DASHBOARD.INTEGRATIONS(organizationId),
        //     icon: LinkIcon,
        // },
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
                                    {organization.logoUrl ? (
                                        <Avatar>
                                            <AvatarImage src={organization.logoUrl} />
                                            <AvatarFallback>{upperCase(organization.name.slice(0, 2))}</AvatarFallback>
                                        </Avatar>
                                    ) : (
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                            <Command className="size-4" />
                                        </div>
                                    )}

                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{organization.name}</span>
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
