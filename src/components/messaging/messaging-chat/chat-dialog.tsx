import { truncate } from 'lodash'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { CardContent } from '~/components/ui/card'

import { Card } from '~/components/ui/card'
import { cn } from '~/lib/utils'
import { DialogMessage } from '~/services/messaging/model'

export const ChatDialog = ({
    username,
    avatar,
    lastMessage,
    isSelected,
    onSelect,
}: {
    username: string | null
    avatar: string | null
    lastMessage: DialogMessage | undefined
    isSelected: boolean
    onSelect: () => void
}) => {
    return (
        <Card className={cn('p-2 cursor-pointer hover:bg-muted transition-colors', { 'bg-muted': isSelected })} onClick={onSelect}>
            <CardContent className="flex justify-start items-center gap-3 relative">
                <Avatar className="size-12 text-sm">
                    <AvatarImage src={avatar ?? ''} />
                    <AvatarFallback>{username?.slice(0, 2)}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">{username}</p>
                    <p className="text-xs text-muted-foreground">{truncate(lastMessage?.content, { length: 100 })}</p>
                </div>
            </CardContent>
        </Card>
    )
}
