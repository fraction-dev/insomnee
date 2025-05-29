import Image from 'next/image'
import { ChangeEvent, KeyboardEvent } from 'react'

import { BlurFade } from '~/components/ui/blur-fade'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area'
import { Separator } from '~/components/ui/separator'
import { cn } from '~/lib/shared/utils'

const DEFAULT_SUGGESTIONS = [
    'What is my spending on Software?',
    'Find a transaction for $100',
    'Find a document from last week',
    "What's my revenue?",
    'What is my spending on Software?',
    'Find a transaction for $100',
    'Find a document from last week',
    "What's my revenue?",
    'What is my spending on Software?',
    'Find a transaction for $100',
    'Find a document from last week',
]

interface Props {
    inputValue: string
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onSubmit: () => void
}

export const AssistantDialogFooter = ({ inputValue, onInputChange, onSubmit }: Props) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmit()
        }
    }

    const handleSuggestionClick = async (suggestion: string) => {
        onInputChange({ target: { value: suggestion } } as ChangeEvent<HTMLInputElement>)
    }

    return (
        <div className="absolute bottom-0 left-0 w-full flex flex-col gap-2">
            <ScrollArea className="w-full max-w-4xl">
                <div className="flex items-center overflow-hidden pl-5 gap-3">
                    {DEFAULT_SUGGESTIONS.map((suggestion, index) => (
                        <BlurFade key={index} delay={index * 0.05} direction="up">
                            <Button
                                variant="outline"
                                size="sm"
                                className={cn('rounded-xs bg-neutral-100 border-neutral-100 dark:bg-neutral-600 dark:border-neutral-600', {
                                    'mr-5': index === DEFAULT_SUGGESTIONS.length - 1,
                                })}
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <span className="text-sm font-normal text-black/80 dark:text-neutral-50">{suggestion}</span>
                            </Button>
                        </BlurFade>
                    ))}
                </div>

                <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>

            <Separator />

            <Input
                autoFocus
                placeholder="Ask Insomnee a question..."
                className="border-none mx-5 p-0"
                value={inputValue}
                onChange={onInputChange}
                onKeyDown={handleKeyDown}
            />

            <Separator />

            <div className="flex items-center justify-between gap-12 px-5 pb-4">
                <Image src="/images/logo.svg" alt="Logo" width={15} height={15} />

                <div className="flex items-center gap-1 cursor-pointer" onClick={onSubmit}>
                    <span className="text-xs font-normal text-black dark:text-neutral-50">Submit</span>
                    <kbd className="rounded-xs bg-border px-1.5 py-0.5 text-xs font-medium text-muted-foreground dark:text-neutral-50">
                        <span className="text-xs font-normal text-black dark:text-neutral-50">↵</span>
                    </kbd>
                </div>
            </div>
        </div>
    )
}
