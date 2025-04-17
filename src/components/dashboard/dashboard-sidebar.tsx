'use client'

import { Bot, ChartNoAxesColumn, Command, Currency, Frame, LifeBuoy, Map, PieChart, Send, Settings2 } from 'lucide-react'
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
import { Organization } from '~/services/organization/model'
import { User } from '~/services/user/model'

import { SidebarNavMain } from '../sidebar/sidebar-nav-main'
import { SidebarNavProjects } from '../sidebar/sidebar-nav-projects'
import { SidebarNavSecondary } from '../sidebar/sidebar-nav-secondary'
import { SidebarNavUser } from '../sidebar/sidebar-nav-user'

// This is sample data.
const data = {
    navMain: [
        {
            title: 'Overview',
            url: '#',
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
            items: [
                {
                    title: 'Notification Channels',
                    url: '#',
                },
                {
                    title: 'Organization',
                    url: '#',
                },
                {
                    title: 'Billing',
                    url: '#',
                },
                {
                    title: 'Limits',
                    url: '#',
                },
            ],
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
    projects: [
        {
            name: 'Design Engineering',
            url: '#',
            icon: Frame,
        },
        {
            name: 'Sales & Marketing',
            url: '#',
            icon: PieChart,
        },
        {
            name: 'Travel',
            url: '#',
            icon: Map,
        },
    ],
}

interface Props {
    organization: Organization
    user: User
}

export function DashboardSidebar({ organization, user, ...props }: Props & React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg">
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{organization.name}</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarNavMain items={data.navMain} />
                <SidebarNavProjects projects={data.projects} />
                <SidebarNavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <SidebarNavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}
