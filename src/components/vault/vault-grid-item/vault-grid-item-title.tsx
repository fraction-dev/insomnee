import { truncate } from 'lodash'

import { Skeleton } from '~/components/ui/skeleton'

interface Props {
    title: string
    isProcessing: boolean
}

export const VaultGridItemTitle = ({ title, isProcessing }: Props) => {
    return isProcessing ? <Skeleton className="w-full h-12" /> : <h3 className="text-sm font-normal">{truncate(title, { length: 50 })}</h3>
}
