import { formatDateToReadableString } from '~/lib/date'
import { cn } from '~/lib/shared/utils'
import { DialogMessage, DialogUser } from '~/services/messaging/model'

interface Props {
    message: DialogMessage
    targetUser: DialogUser
}

export const ChatMessagesItem = ({ message, targetUser }: Props) => {
    return (
        <div
            className={cn('flex flex-col gap-1 max-w-72', {
                'self-end': message.user.username !== targetUser.username,
            })}
        >
            <div
                className={cn('rounded-sm p-2 w-fit text-sm', {
                    'bg-neutral-200 text-primary': message.user.username === targetUser.username,
                    'bg-secondary/80 text-white': message.user.username !== targetUser.username,
                    'self-end': message.user.username !== targetUser.username,
                })}
            >
                <span className="whitespace-pre-wrap leading-relaxed">{message.content}</span>
            </div>

            <p
                className={cn('text-[11px] text-muted-foreground', {
                    'text-right': message.user.username !== targetUser.username,
                })}
            >
                {formatDateToReadableString(message.createdAt, { withHours: true })}
            </p>
        </div>
    )
}
