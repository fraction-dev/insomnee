import dayjs from 'dayjs'
import { LinkIcon, Sparkle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Hint } from '~/components/shared/hint'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Textarea } from '~/components/ui/textarea'
import { useInstagramSendMessage } from '~/hooks/dialogs/useInstagramSendMessage'
import { useUpdateOrganizationIntegrationInstagram } from '~/hooks/organization-integration/useUpdateOrganizationIntegrationInstagram'
import { cn } from '~/lib/utils'
import { OrganizationIntegration, OrganizationIntegrationType } from '~/services/integration/model'
import { DialogMessage, DialogUser } from '~/services/messaging/model'

export const ChatMessages = ({
    type,
    messages,
    targetUser,
    organizationId,
    isSubmitting,
    isBotEnabled,
    selectedIntegration,
}: {
    type: OrganizationIntegrationType
    messages: DialogMessage[]
    targetUser: DialogUser
    organizationId: string
    isSubmitting: boolean
    isBotEnabled: boolean
    selectedIntegration: OrganizationIntegration | null
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const { mutate: sendInstagramMessage, isPending: isSendingInstagramMessage } = useInstagramSendMessage(organizationId)
    const { mutate: updateOrganizationIntegrationInstagram, isPending: isUpdatingOrganizationIntegrationInstagram } =
        useUpdateOrganizationIntegrationInstagram(organizationId)
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

    const handleDisableBot = async () => {
        if (!selectedIntegration) {
            return
        }

        updateOrganizationIntegrationInstagram({
            integrationId: selectedIntegration.id,
            payload: {
                isBotEnabled: false,
            },
        })
    }

    const handleOpenInInstagram = (username: string) => {
        if (type === 'INSTAGRAM') {
            window.open(`https://www.instagram.com/${username}`, '_blank')
        }
    }

    return (
        <Card className="relative">
            <ScrollArea ref={scrollContainerRef} className="h-[calc(100vh-16rem)] pb-38">
                <CardContent className="flex flex-col gap-4">
                    <div className="flex justify-between items-center gap-12 border-b border-border pb-4 sticky top-0 bg-background">
                        <div className="flex items-center gap-2 sticky top-0 bg-background">
                            <Avatar className="size-8 text-sm">
                                <AvatarImage src={targetUser.avatar ?? ''} />
                                <AvatarFallback>{targetUser.username?.slice(0, 2)}</AvatarFallback>
                            </Avatar>

                            <p className="text-sm font-medium">{targetUser.username}</p>
                        </div>

                        {type === 'INSTAGRAM' && (
                            <Hint content="Open in Instagram">
                                <Button variant="outline" size="icon" onClick={() => handleOpenInInstagram(targetUser.username ?? '')}>
                                    <LinkIcon className="size-4" />
                                </Button>
                            </Hint>
                        )}
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
                {isBotEnabled && (
                    <div className="h-24 bg-neutral-100">
                        <div className="max-w-lg flex justify-center text-center m-auto h-full items-center flex-col gap-2 text-neutral-800">
                            <span className="text-xs leading-relaxed">
                                You enabled the bot for this conversation. It will respond to your messages automatically.
                            </span>

                            <Button
                                isLoading={isUpdatingOrganizationIntegrationInstagram}
                                variant="outline"
                                size="sm"
                                className="text-xs"
                                onClick={handleDisableBot}
                            >
                                Disable bot
                            </Button>
                        </div>
                    </div>
                )}

                {!isBotEnabled && (
                    <>
                        <Textarea
                            value={message}
                            placeholder="Message"
                            className="h-24 bg-white"
                            onChange={(e) => setMessage(e.target.value)}
                        />

                        <div className="flex justify-end gap-2">
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
                    </>
                )}
            </div>
        </Card>
    )
}
