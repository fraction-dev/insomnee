import { Message } from '@ai-sdk/react'
import { User } from 'better-auth'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { FaSpinner } from 'react-icons/fa'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { ScrollArea } from '~/components/ui/scroll-area'
import { cn } from '~/lib/shared/utils'
import { getInitials } from '~/lib/strings/get-string-initials'

interface Props {
    user: User
    messages: Message[]
    isLoading: boolean
}

export const AssistantDialogContent = ({ user, messages, isLoading }: Props) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const scrollArea = scrollContainerRef.current?.querySelector('[data-radix-scroll-area-viewport]')
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight
        }
    }, [messages])

    return (
        <div
            className={cn('px-5 flex flex-col h-[450px]', {
                'py-24': !messages.length,
            })}
        >
            <div
                className={cn('flex flex-col gap-4', {
                    'justify-center items-center': !messages.length,
                })}
            >
                {messages.length ? (
                    <ScrollArea ref={scrollContainerRef} className="h-full max-h-[350px] pb-14 pr-4">
                        <div className="flex flex-col gap-4">
                            {messages.map((message) => (
                                <MessageItem key={message.id} content={message.content} role={message.role} user={user} />
                            ))}

                            {isLoading && (
                                <div className="flex items-center gap-2">
                                    <Image src="/images/logo.svg" alt="Logo" width={25} height={25} />
                                    <FaSpinner className="size-4 text-muted-foreground animate-spin" />
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                ) : (
                    <>
                        <Image src="/images/logo.svg" alt="Logo" width={35} height={35} />
                        <h3 className="text-lg font-normal max-w-[180px] m-auto leading-normal text-center">
                            Hi {user.name || 'there'}, how can I help you today?
                        </h3>
                    </>
                )}
            </div>
        </div>
    )
}

const MessageItem = ({ content, role, user }: { content: string; role: Message['role']; user: User }) => {
    return (
        <div className="flex gap-2">
            <Avatar className="rounded-xs size-6">
                <AvatarImage src={role === 'user' ? (user.image ?? '') : '/images/logo.svg'} className="rounded-xs" />
                {role === 'user' && <AvatarFallback className="text-xs">{getInitials(user.name || user.email || '')}</AvatarFallback>}
            </Avatar>

            <p className="text-neutral-800 leading-normal font-normal text-xs font-mono">{content}</p>
        </div>
    )
}
