import { useEffect, useState } from 'react'

import { Card, CardContent } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import { useVaultFile } from '~/hooks/vault/useVaultFile'
import { cn } from '~/lib/shared/utils'
import { FileUpload } from '~/services/file-upload/model'

import { VaultItemPreviewSheet } from '../vault-item-preview/vault-item-preview-sheet'
import { VaultGridItemActions } from './vault-grid-item-actions'
import { VaultGridItemDescription } from './vault-grid-item-description'
import { VaultGridItemFilePreview } from './vault-grid-item-file-preview'
import { VaultGridItemTags } from './vault-grid-item-tags'
import { VaultGridItemTitle } from './vault-grid-item-title'

interface Props {
    organizationId: string
    file: FileUpload
}

export const VaultGridItem = ({ organizationId, file }: Props) => {
    const [fileData, setFileData] = useState<FileUpload>(file)
    const [isPreviewSheetOpen, setIsPreviewSheetOpen] = useState(false)

    const { data, isLoading, refetch } = useVaultFile(organizationId, file.id, {
        enabled: fileData.status === 'PROCESSING',
    })

    useEffect(() => {
        const interval = setInterval(() => {
            if (fileData.status === 'PROCESSING') {
                refetch()
            }
        }, 2000)

        if (data?.data) {
            setFileData(data.data)
        }

        return () => {
            clearInterval(interval)
        }
    }, [fileData, refetch, data?.data])

    const isProcessing = isLoading || fileData.status === 'PROCESSING'

    return (
        <>
            <Card className="hover:bg-neutral-50 transition-colors group relative">
                <CardContent className="flex flex-col gap-6">
                    <div className="flex justify-between gap-12 items-start">
                        <button
                            type="button"
                            className={cn('w-[80px] h-[80px] flex items-center justify-center relative cursor-pointer')}
                            onClick={() => {
                                setIsPreviewSheetOpen(true)
                            }}
                        >
                            {isProcessing && (
                                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                                    <Skeleton className="w-6 h-6 rounded-full" />
                                </div>
                            )}
                            {file.mimeType === 'image/heic' ? (
                                <Skeleton className="absolute inset-0 w-full h-full" />
                            ) : (
                                <VaultGridItemFilePreview filePath={file.url} mimeType={file.mimeType} />
                            )}
                        </button>

                        <div className="absolute top-4 right-4 hidden group-hover:flex">
                            <VaultGridItemActions organizationId={organizationId} file={fileData} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <VaultGridItemTitle title={fileData.title || fileData.name} isProcessing={isProcessing} />
                        <VaultGridItemDescription description={fileData.description || ''} isProcessing={isProcessing} />
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        <VaultGridItemTags tags={fileData.tags || []} isProcessing={isProcessing} />
                    </div>
                </CardContent>
            </Card>

            <VaultItemPreviewSheet
                organizationId={organizationId}
                file={fileData}
                isOpen={isPreviewSheetOpen}
                onClose={() => setIsPreviewSheetOpen(false)}
            />
        </>
    )
}
