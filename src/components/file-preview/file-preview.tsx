'use client'

import { useEffect, useState } from 'react'

import { cn } from '~/lib/shared/utils'

import { Skeleton } from '../ui/skeleton'
import { FilePreviewIcon } from './file-preview-icon'

type Props = {
    mimeType: string
    filePath: string
}

export function FilePreview({ mimeType, filePath }: Props) {
    const [isLoading, setIsLoading] = useState(true)

    let src = null

    if (mimeType.startsWith('image/')) {
        src = `/api/proxy?filePath=${filePath}`
    }

    if (mimeType.startsWith('application/pdf') || mimeType.startsWith('application/octet-stream')) {
        // NOTE: Make a image from the pdf
        src = `/api/preview?filePath=${filePath}`
    }

    useEffect(() => {
        if (src) {
            const img = new Image()
            img.src = src
            img.onload = () => setIsLoading(false)
            img.onerror = () => setIsLoading(false)
        }
    }, [src])

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
