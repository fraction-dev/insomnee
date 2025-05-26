'use client'

import { ChevronsUpDown, LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '~/components/ui/sidebar'
import { ROUTES } from '~/config/routes'
import { signOut } from '~/lib/shared/auth-client'
import { getInitials } from '~/lib/strings/get-string-initials'
import { User } from '~/services/user/model'

export function SidebarNavUser({ user }: { user: User }) {
    const router = useRouter()
    const { isMobile } = useSidebar()

    const handleLogout = async () => {
        await signOut()
        router.push(ROUTES.AUTH)
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.image ?? undefined} alt={user.name ?? undefined} />
                                <AvatarFallback className="rounded-lg">{getInitials(user.name ?? '')}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.name}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xs"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.image ?? undefined} alt={user.name ?? undefined} />
                                    <AvatarFallback className="rounded-lg">{getInitials(user.name ?? '')}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-xs" onClick={handleLogout}>
                            <LogOutIcon className="size-3" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
