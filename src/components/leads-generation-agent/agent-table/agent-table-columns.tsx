import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '~/components/ui/badge'
import { formatDateToReadableString } from '~/lib/date/date'
import { formatNumberToReadableString } from '~/lib/number/number'
import { cn } from '~/lib/shared/utils'
import { LeadsGenerationAgentRun, LeadsGenerationAgentRunStatus } from '~/services/leads-generation/model'

const isPending = (status: LeadsGenerationAgentRunStatus) => {
    return status === 'PENDING'
}

export const leadsGenerationAgentTableColumns: ColumnDef<LeadsGenerationAgentRun>[] = [
    {
        header: 'Company Name',
        cell: ({ row }) => <p className="text-sm font-medium">{row.original.runId}</p>,
    },
    {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
        header: 'Execution Time',
        cell: ({ row }) => (
            <p className="text-sm font-medium">{isPending(row.original.status) ? 'N/A' : `${row.original.executionTimeInSeconds}s`}</p>
        ),
    },
    {
        header: 'Run Date',
        cell: ({ row }) => <p className="text-sm font-medium">{formatDateToReadableString(row.original.createdAt, { withHours: true })}</p>,
    },
    {
        header: 'Insights',
        cell: ({ row }) => (
            <p className="text-sm font-medium">
                {isPending(row.original.status) ? 'N/A' : formatNumberToReadableString(row.original.insights?.length ?? 0)}
            </p>
        ),
    },
    {
        header: 'News Articles',
        cell: ({ row }) => (
            <p className="text-sm font-medium">
                {isPending(row.original.status) ? 'N/A' : formatNumberToReadableString(row.original.newsArticles?.length ?? 0)}
            </p>
        ),
    },
]

const StatusBadge = ({ status }: { status: LeadsGenerationAgentRunStatus }) => {
    const badgeVariant = cn({
        'border-emerald-500 text-emerald-700 bg-emerald-50': status === 'COMPLETED',
        'border-rose-500 text-rose-700 bg-rose-50': status === 'FAILED',
        'border-amber-500 text-amber-700 bg-amber-50': status === 'PENDING',
    })

    return (
        <Badge variant="outline" className={cn(badgeVariant, 'text-xs rounded-xs font-medium')}>
            {status}
        </Badge>
    )
}
