import { memo } from 'react'

import { cn } from '~/lib/shared/utils'

export const InvoicePlaceholder = memo(({ className, onClick }: { className?: string; onClick?: () => void }) => (
    <div
        className={cn(
            className,
            'bg-[repeating-linear-gradient(-60deg,#DBDBDB,#DBDBDB_1px,transparent_1px,transparent_5px)] dark:bg-[repeating-linear-gradient(-60deg,#2C2C2C,#2C2C2C_1px,transparent_1px,transparent_5px)]',
        )}
        onClick={onClick}
    />
))

InvoicePlaceholder.displayName = 'InvoicePlaceholder'
