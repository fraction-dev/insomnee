import { toLower, upperFirst } from 'lodash'

import { cn } from '~/lib/shared/utils'
import { InvoiceStatus } from '~/services/invoice/model'

import { Badge } from '../ui/badge'

export const InvoiceStatusBadge = ({ status }: { status: InvoiceStatus }) => {
    const style = cn('rounded-xs text-[11px] font-mono', {
        'border-green-500 bg-green-500/10 text-green-500': status === 'PAID',
        'border-yellow-500 bg-yellow-500/10 text-yellow-500': status === 'SENT',
        'border-red-500 bg-red-500/10 text-red-500': status === 'CANCELLED',
        'border-muted-foreground/10 bg-muted-foreground/10 text-primary': status === 'DRAFT',
    })

    return <Badge className={cn(style)}>{upperFirst(toLower(status))}</Badge>
}
