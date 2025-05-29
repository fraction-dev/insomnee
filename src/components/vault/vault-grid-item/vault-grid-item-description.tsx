import { Skeleton } from '~/components/ui/skeleton'

interface Props {
    description: string
    isProcessing: boolean
}

export const VaultGridItemDescription = ({ description, isProcessing }: Props) => {
    return isProcessing ? (
        <div className="flex flex-col gap-1">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
        </div>
    ) : (
        <p className="text-xs font-normal text-muted-foreground leading-relaxed">{description || '-'}</p>
    )
}
