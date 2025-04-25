import dayjs from 'dayjs'
import { Activity, Sparkle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Hint } from '~/components/shared/hint'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Textarea } from '~/components/ui/textarea'
import { useInstagramSendMessage } from '~/hooks/dialogs/useInstagramSendMessage'
import { cn } from '~/lib/utils'
import { OrganizationIntegrationType } from '~/services/integration/model'
import { DialogMessage, DialogUser } from '~/services/messaging/model'

export const ChatMessages = ({
    type,
    messages,
    targetUser,
    isBotEnabled,
    organizationId,
    isSubmitting,
}: {
    type: OrganizationIntegrationType
    messages: DialogMessage[]
    targetUser: DialogUser
    isBotEnabled: boolean
    organizationId: string
    isSubmitting: boolean
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const { mutate: sendInstagramMessage, isPending: isSendingInstagramMessage } = useInstagramSendMessage(organizationId)
    const [message, setMessage] = useState<string>('')

    const isLoading = isSendingInstagramMessage || isSubmitting

    useEffect(() => {
        const scrollArea = scrollContainerRef.current?.querySelector('[data-radix-scroll-area-viewport]')
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        setMessage('')
    }, [messages.length])

    const handleSendInstagramMessage = async (recipientId: string, message: string) => {
        sendInstagramMessage({ recipientId, message })
    }

    return (
        <Card className="relative">
            <ScrollArea className="h-[calc(100vh-20rem)] pb-38" ref={scrollContainerRef}>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 sticky top-0 bg-background border-b border-border pb-4">
                        <Avatar className="size-8 text-sm">
                            <AvatarImage src={targetUser.avatar ?? ''} />
                            <AvatarFallback>{targetUser.username?.slice(0, 2)}</AvatarFallback>
                        </Avatar>

                        <p className="text-sm font-medium">{targetUser.username}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        {messages.map((message, key) => {
                            return (
                                <div
                                    key={key}
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
                                        {dayjs(message.createdAt).format('DD.MM.YYYY, HH:mm')}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </ScrollArea>

            <div className="absolute bottom-0 left-0 right-0 p-2 flex flex-col gap-2">
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" className="h-24 bg-white" />

                <div className="flex justify-between gap-2">
                    <Hint
                        content={`AI Agent ${isBotEnabled ? 'operating normally' : 'not operating'}`}
                        containerClassName="flex gap-1 items-center text-sm text-muted-foreground"
                    >
                        <span className="font-[400]">AI Agent</span>
                        <Activity className={`size-4 ${isBotEnabled ? 'text-green-600' : 'text-red-600'}`} />
                    </Hint>

                    <div className="flex items-center gap-2">
                        <Hint content="Generate a response">
                            <Button variant="outline" size="icon">
                                <Sparkle className="size-4" />
                            </Button>
                        </Hint>
                        <Button
                            isLoading={isLoading}
                            onClick={async () => {
                                if (type === 'INSTAGRAM') {
                                    await handleSendInstagramMessage(targetUser.id, message)
                                }
                            }}
                        >
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}
