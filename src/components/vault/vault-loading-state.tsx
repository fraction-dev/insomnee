/**
 * By default the selected layout is grid.
 */

import { Skeleton } from '../ui/skeleton'

export const VaultLoadingState = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-end gap-2">
                <Skeleton className="size-10" />
                <Skeleton className="size-10" />
                <Skeleton className="size-10" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="w-full h-64 aspect-square" />
                ))}
            </div>
        </div>
    )
}
