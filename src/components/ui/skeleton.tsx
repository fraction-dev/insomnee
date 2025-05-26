import { ComponentProps } from 'react'

import { cn } from '~/lib/shared/utils'

function Skeleton({ className, ...props }: ComponentProps<'div'>) {
    return <div data-slot="skeleton" className={cn('bg-accent animate-pulse rounded-xs', className)} {...props} />
}

export { Skeleton }
