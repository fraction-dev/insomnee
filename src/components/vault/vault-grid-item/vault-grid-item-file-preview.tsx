import { useState } from 'react'

import { FilePreviewIcon } from '~/components/file-preview/file-preview-icon'
import { Skeleton } from '~/components/ui/skeleton'
import { cn } from '~/lib/shared/utils'

interface Props {
    mimeType: string
    filePath: string
}

export const VaultGridItemFilePreview = ({ mimeType, filePath }: Props) => {
    const [isLoading] = useState(false)

    let src = null

    if (mimeType.startsWith('image')) {
        src = filePath
    }

    if (!src) {
        return <FilePreviewIcon mimetype={mimeType} />
    }

    return (
        <div className="w-full h-full relative">
            {isLoading && <Skeleton className="absolute inset-0 w-full h-full" />}

            <img
                src={src}
                alt="File Preview"
                className={cn(
                    'w-full h-full object-contain border border-border dark:border-none',
                    isLoading ? 'opacity-0' : 'opacity-100',
                    'transition-opacity duration-100',
                )}
            />
        </div>
    )
}
