import { Badge } from '~/components/ui/badge'
import { Skeleton } from '~/components/ui/skeleton'

interface Props {
    tags: string[]
    isProcessing: boolean
}

export const VaultGridItemTags = ({ tags, isProcessing }: Props) => {
    return isProcessing
        ? Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="w-full h-4" />)
        : tags.map((tag, index) => (
              <Badge
                  key={index}
                  variant="outline"
                  className="text-xs rounded-xs text-muted-foreground font-normal bg-muted-foreground/10 border-none"
              >
                  {tag}
              </Badge>
          ))
}
