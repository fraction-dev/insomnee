import { useEffect, useRef } from 'react'

import { Card, CardContent } from '~/components/ui/card'
import { ScrollArea } from '~/components/ui/scroll-area'
import { useInstagramSendMessage } from '~/hooks/dialogs/useInstagramSendMessage'
import { useUpdateOrganizationIntegrationInstagram } from '~/hooks/organization-integration/useUpdateOrganizationIntegrationInstagram'
import { OrganizationIntegration, OrganizationIntegrationType } from '~/services/integration/model'
import { DialogMessage, DialogUser } from '~/services/messaging/model'

import { ChatMessagesBotEnabledBanner } from './chat-messages-bot-enabled-banner'
import { ChatMessagesForm } from './chat-messages-form'
import { ChatMessagesHeader } from './chat-messages-header'
import { ChatMessagesItem } from './chat-messages-item'

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

    const isLoading = isSendingInstagramMessage || isSubmitting

    useEffect(() => {
        const scrollArea = scrollContainerRef.current?.querySelector('[data-radix-scroll-area-viewport]')
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight
        }
    }, [messages])

    const handleSendInstagramMessage = async (message: string) => {
        sendInstagramMessage({ recipientId: targetUser.id, message })
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

    return (
        <Card className="relative">
            <ScrollArea ref={scrollContainerRef} className="h-[calc(100vh-16rem)] pb-38">
                <CardContent className="flex flex-col gap-4">
                    <ChatMessagesHeader type={type} user={targetUser} />

                    <div className="flex flex-col gap-2">
                        {messages.map((message, key) => {
                            return <ChatMessagesItem key={key} message={message} targetUser={targetUser} />
                        })}
                    </div>
                </CardContent>
            </ScrollArea>

            <div className="absolute bottom-0 left-0 right-0 p-2 flex flex-col gap-2">
                {isBotEnabled && (
                    <ChatMessagesBotEnabledBanner
                        isLoading={isUpdatingOrganizationIntegrationInstagram}
                        onBotDisableClick={handleDisableBot}
                    />
                )}

                {!isBotEnabled && <ChatMessagesForm isLoading={isLoading} onSubmit={handleSendInstagramMessage} />}
            </div>
        </Card>
    )
}
