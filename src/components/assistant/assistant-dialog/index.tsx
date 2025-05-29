import { useChat } from '@ai-sdk/react'
import { useQueryClient } from '@tanstack/react-query'
import { generateId } from 'ai'
import { User } from 'better-auth'
import { useState } from 'react'

import { Dialog, DialogContent } from '~/components/ui/dialog'
import { Separator } from '~/components/ui/separator'
import { useUserChats } from '~/hooks/user-chat/useUserChats'

import { AssistantDialogContent } from './assistant-dialog-content'
import { AssistantDialogFooter } from './assistant-dialog-footer'
import { AssistantDialogHeader } from './assistant-dialog-header'

interface Props {
    user: User
    organizationId: string
    isOpen: boolean
    onClose: () => void
}

export const AssistantDialog = ({ user, isOpen, organizationId, onClose }: Props) => {
    const queryClient = useQueryClient()

    useUserChats(organizationId, user.id)
    const [chatId] = useState<string>(generateId())

    const { input, messages, status, handleInputChange, handleSubmit } = useChat({
        key: chatId,
        api: '/api' + `/organization/${organizationId}/user/${user.id}/chat-assistant`,
        initialMessages: [],
        body: {
            chatId,
        },
        onFinish: () => {
            queryClient.invalidateQueries({ queryKey: ['user-chats', organizationId, user.id] })
        },
    })

    const isLoading = status === 'submitted' || status === 'streaming'

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="[&>button]:hidden md:min-w-4xl w-full px-0 py-0 overflow-hidden">
                <div className="flex w-full">
                    {/* <div className="bg-neutral-50 w-56 h-full relative">
                        {userChats?.data.length === 0 && (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-muted-foreground text-xs">No chats yet</p>
                            </div>
                        )}

                        {userChats?.data.length !== 0 && (
                            <ScrollArea className="h-[500px] gap-4">
                                <div className="h-full p-5 flex flex-col gap-4">
                                    {userChats?.data.map((chat) => (
                                        <div
                                            key={chat.id}
                                            className="text-[11px] text-muted-foreground font-mono leading-relaxed cursor-pointer hover:text-neutral-700 transition-colors"
                                            onClick={() => handleChatClick(chat.id)}
                                        >
                                            {chat.title}
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        )}

                        <div className="mx-auto absolute bottom-4 left-1/2 -translate-x-1/2">
                            <Button variant="outline" size="sm" onClick={() => setChatId(generateId())}>
                                <span className="text-xs text-muted-foreground">New chat</span>
                            </Button>
                        </div>
                    </div> */}
                    <div className="w-full flex flex-col gap-4 relative pt-5">
                        <AssistantDialogHeader />
                        <Separator />
                        <AssistantDialogContent user={user} messages={messages} isLoading={isLoading} />
                        <AssistantDialogFooter inputValue={input} onInputChange={handleInputChange} onSubmit={handleSubmit} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
