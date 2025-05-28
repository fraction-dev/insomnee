import { PropsWithChildren, ReactNode } from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

interface Props {
    content: string | ReactNode
    containerClassName?: string
}

export const Hint = ({ content, children, containerClassName }: PropsWithChildren<Props>) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent className={containerClassName}>{content}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
