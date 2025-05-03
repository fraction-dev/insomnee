'use client'

import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import { useIsMobile } from '~/hooks/useIsMobile'
import { useSession } from '~/lib/auth-client'

import { AssistantDialog } from '../assistant/assistant-dialog'
import { SidebarTrigger } from '../ui/sidebar'

interface Props {
    organizationId: string
}

export const DashboardNavbar = ({ organizationId }: Props) => {
    const { data: session } = useSession()
    const isMobile = useIsMobile()
    const [isAssistantOpen, setIsAssistantOpen] = useState(false)

    useHotkeys('command+k', () => {
        setIsAssistantOpen(true)
    })

    if (!session?.user) {
        return null
    }

    return (
        <>
            <div className="w-full border-b border-border pb-4 flex items-center justify-between">
                <SidebarTrigger className="block md:hidden" />

                <div className="max-w-5xl w-fit flex items-center gap-4 cursor-pointer group" onClick={() => setIsAssistantOpen(true)}>
                    <p className="text-[14px] text-neutral-400 font-light group-hover:text-neutral-500 transition-colors">
                        {isMobile ? 'Tap to ask Insomnee a question...' : 'Ask Insomnee a question...'}
                    </p>

                    <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded-xs bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground group-hover:text-neutral-500 transition-colors hidden md:inline-flex">
                        <span className="text-xs">⌘+k</span>
                    </kbd>
                </div>
            </div>

            <AssistantDialog
                user={session.user}
                isOpen={isAssistantOpen}
                organizationId={organizationId}
                onClose={() => setIsAssistantOpen(false)}
            />
        </>
    )
}
