import { PropsWithChildren, ReactNode } from 'react'

import { cn } from '~/lib/shared/utils'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

interface Props {
    content: string | ReactNode
    containerClassName?: string
    contentClassName?: string
}

export const Hint = ({ content, containerClassName, contentClassName, children }: PropsWithChildren<Props>) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className={cn('text-sm text-muted-foreground', containerClassName)}>{children}</span>
                </TooltipTrigger>

                <TooltipContent className={contentClassName}>{content}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
