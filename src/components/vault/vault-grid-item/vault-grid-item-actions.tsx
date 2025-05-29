import { CheckIcon, CopyIcon, DownloadIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { DeleteDialog } from '~/components/shared/delete-dialog'
import { Button } from '~/components/ui/button'
import { Hint } from '~/components/ui/hint'
import { useDeleteVaultFiles } from '~/hooks/vault/useDeleteVaultFiles'
import { FileUpload } from '~/services/file-upload/model'

interface Props {
    organizationId: string
    file: FileUpload
}

export const VaultGridItemActions = ({ organizationId, file }: Props) => {
    const { mutate: deleteFiles, isPending: isDeleting } = useDeleteVaultFiles(organizationId)

    const [isCopied, setIsCopied] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const handleCopyFileLink = () => {
        navigator.clipboard.writeText(file.url)
        setIsCopied(true)
        toast.success('File link copied to clipboard')
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }

    const handleDownloadFile = () => {
        window.open(file.url, '_blank')
    }

    const handleTriggerDeleteDialog = () => {
        setIsDeleteDialogOpen((prev) => !prev)
    }

    const handleDeleteFile = () => {
        deleteFiles([file.id], {
            onSuccess: () => {
                toast.success('File deleted from vault')
                setIsDeleteDialogOpen(false)
            },
        })
    }

    return (
        <>
            <div className="items-center gap-2 flex">
                <Hint content="Copy file link">
                    <Button size="icon" variant="outline" onClick={handleCopyFileLink}>
                        {isCopied ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
                    </Button>
                </Hint>

                <Hint content="Download file">
                    <Button size="icon" variant="outline" onClick={handleDownloadFile}>
                        <DownloadIcon className="size-3" />
                    </Button>
                </Hint>

                <Hint content="Delete from vault">
                    <Button size="icon" variant="outline" onClick={handleTriggerDeleteDialog}>
                        <TrashIcon className="size-3" />
                    </Button>
                </Hint>
            </div>

            <DeleteDialog
                isLoading={isDeleting}
                isOpen={isDeleteDialogOpen}
                description="Are you sure you want to delete this file from your vault? This action cannot be undone."
                title="Delete file from your vault"
                onOpenChange={handleTriggerDeleteDialog}
                onDelete={handleDeleteFile}
            />
        </>
    )
}
