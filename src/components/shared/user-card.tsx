import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface Props {
    image: string | null
    name: string
}

export const UserCard = ({ image, name }: Props) => {
    return (
        <div className="flex items-center gap-2">
            <Avatar className="size-4">
                <AvatarImage src={image ?? undefined} />
                <AvatarFallback className="text-xs">{name.charAt(0)}</AvatarFallback>
            </Avatar>

            <p className="text-xs font-light">{name}</p>
        </div>
    )
}
