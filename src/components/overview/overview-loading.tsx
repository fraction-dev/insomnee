import { Skeleton } from '../ui/skeleton'

export const OverviewLoading = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
            </div>

            <Skeleton className="h-[600px] w-full" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
            </div>
        </div>
    )
}
