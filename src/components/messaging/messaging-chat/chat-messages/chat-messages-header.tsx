import { ExternalLinkIcon } from 'lucide-react'

import { Hint } from '~/components/shared/hint'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { getInitials } from '~/lib/strings/get-string-initials'
import { IntegrationType } from '~/services/integration/model'
import { DialogUser } from '~/services/messaging/model'

interface Props {
    type: IntegrationType
    user: DialogUser
}

export const ChatMessagesHeader = ({ type, user }: Props) => {
    const handleOpenLink = (value: string) => {
        switch (type) {
            case 'INSTAGRAM':
                window.open(`https://www.instagram.com/${value}`, '_blank')
                break
        }
    }

    return (
        <div className="flex justify-between items-center gap-12 border-b border-border pb-4 sticky top-0 bg-background">
            <div className="flex items-center gap-2 sticky top-0 bg-background">
                <Avatar className="size-8 text-sm">
                    <AvatarImage src={user.avatar ?? ''} />
                    <AvatarFallback>{getInitials(user.username ?? '')}</AvatarFallback>
                </Avatar>

                <p className="text-sm font-medium">{user.username}</p>
            </div>

            {type === 'INSTAGRAM' && (
                <Hint content="Open in Instagram">
                    <Button variant="outline" size="icon" onClick={() => handleOpenLink(user.username ?? '')}>
                        <ExternalLinkIcon className="size-4" />
                    </Button>
                </Hint>
            )}
        </div>
    )
}
