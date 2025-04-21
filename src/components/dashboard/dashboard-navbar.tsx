'use client'

import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import { AssistantModal } from '../assistant/assistant-modal'

export const DashboardNavbar = () => {
    const [isAssistantOpen, setIsAssistantOpen] = useState(false)

    useHotkeys('command+k', () => {
        setIsAssistantOpen(true)
    })

    return (
        <>
            <div className="w-full border-b border-border pb-4">
                <div className="max-w-5xl w-full flex items-center gap-4 cursor-pointer group" onClick={() => setIsAssistantOpen(true)}>
                    <p className="text-[14px] text-neutral-400 font-light group-hover:text-neutral-500 transition-colors">
                        Ask Insomnee a question...
                    </p>

                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-xs bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground group-hover:text-neutral-500 transition-colors">
                        <span className="text-xs">⌘+k</span>
                    </kbd>
                </div>
            </div>

            <AssistantModal isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
        </>
    )
}
