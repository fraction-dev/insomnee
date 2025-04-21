import { Skeleton } from '../ui/skeleton'

export const TransactionsViewSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-[800px] w-full" />
        </div>
    )
}
