import { useRouter } from 'next/navigation'

import { signOut } from '~/lib/shared/auth-client'
import { User } from '~/services/user/model'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

interface Props {
    user: User
}

export const UserMenu = ({ user }: Props) => {
    const router = useRouter()

    const handleLogout = async () => {
        await signOut()
        router.refresh()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={user.image ?? ''} />
                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
