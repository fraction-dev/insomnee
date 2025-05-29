import { ScrollArea } from '~/components/ui/scroll-area'
import { Separator } from '~/components/ui/separator'
import { Sheet, SheetContent } from '~/components/ui/sheet'
import { getReadableFileSize } from '~/lib/file'
import { FileUpload } from '~/services/file-upload/model'

import { VaultGridItemActions } from '../vault-grid-item/vault-grid-item-actions'
import { VaultGridItemFilePreview } from '../vault-grid-item/vault-grid-item-file-preview'
import { VaultGridItemTags } from '../vault-grid-item/vault-grid-item-tags'
import { VaultItemPreviewSkeleton } from './vault-item-preview-skeleton'

interface Props {
    organizationId: string
    file?: FileUpload | null
    isOpen: boolean
    onClose: () => void
}

export const VaultItemPreviewSheet = ({ organizationId, file, isOpen, onClose }: Props) => {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="max-h-[calc(100vh-20px)] mt-3 mb-3 mr-3 rounded-xs p-4 min-w-xl">
                <ScrollArea isScrollBarHidden className="h-full py-12">
                    {!file && <VaultItemPreviewSkeleton />}
                    {file && (
                        <div className="flex flex-col gap-6">
                            <div className="flex justify-between items-center gap-12 relative">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-base font-mono font-normal">{file.title || file.name || '-'}</h3>
                                    <p className="text-xs font-mono text-muted-foreground font-light">{getReadableFileSize(file.size)}</p>
                                </div>

                                <VaultGridItemActions organizationId={organizationId} file={file} />
                            </div>

                            <div className="min-h-[700px] flex flex-col justify-center items-center bg-neutral-100">
                                {file.mimeType.startsWith('image') ? (
                                    <VaultGridItemFilePreview filePath={file.url} mimeType={file.mimeType} />
                                ) : (
                                    <div className="size-12">
                                        <VaultGridItemFilePreview filePath={file.url} mimeType={file.mimeType} />
                                    </div>
                                )}
                            </div>

                            {file.description && (
                                <p className="text-xs text-muted-foreground font-mono leading-relaxed font-light">{file.description}</p>
                            )}

                            {file.tags && file.tags.length > 0 && (
                                <>
                                    <Separator />
                                    <div className="flex flex-wrap gap-2">
                                        <VaultGridItemTags tags={file.tags} isProcessing={false} />
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
