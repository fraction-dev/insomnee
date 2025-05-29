import { Separator } from '~/components/ui/separator'
import { Skeleton } from '~/components/ui/skeleton'

export const VaultItemPreviewSkeleton = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-12">
                <Skeleton className="h-6 w-full" />

                <div className="flex items-center gap-2">
                    <Skeleton className="size-6" />
                    <Skeleton className="size-6" />
                </div>
            </div>

            <Skeleton className="h-[700px] w-full" />
            <Separator />
            {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
            ))}
        </div>
    )
}
