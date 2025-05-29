import { EllipsisVerticalIcon } from 'lucide-react'
import { useState } from 'react'

import { DeleteDialog } from '~/components/shared/delete-dialog'
import { Button } from '~/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { useDeleteVaultFiles } from '~/hooks/vault/useDeleteVaultFiles'
import { useVaultFileActions } from '~/hooks/vault/useVaultFileActions'
import { FileUpload } from '~/services/file-upload/model'

import { VaultItemPreviewSheet } from '../vault-item-preview/vault-item-preview-sheet'

interface Props {
    organizationId: string
    file: FileUpload
}

export const VaultTableActions = ({ organizationId, file }: Props) => {
    const { mutate: deleteFiles, isPending: isDeleting } = useDeleteVaultFiles(organizationId)
    const { handleCopyFileLink, handleDownloadFile } = useVaultFileActions(file)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isPreviewSheetOpen, setIsPreviewSheetOpen] = useState(false)

    const handleDeleteFiles = () => {
        deleteFiles([file.id], {
            onSuccess: () => {
                setIsDeleteDialogOpen(false)
            },
        })
    }

    const handleTriggerDeleteDialog = () => {
        setIsDeleteDialogOpen(!isDeleteDialogOpen)
    }

    const handleTriggerPreviewSheet = () => {
        setIsPreviewSheetOpen(!isPreviewSheetOpen)
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="text-center" onClick={(e) => e.stopPropagation()}>
                        <EllipsisVerticalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onSelect={handleTriggerPreviewSheet}>View details</DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleDownloadFile}>Download</DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleCopyFileLink}>Copy link</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onSelect={handleTriggerDeleteDialog}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteDialog
                isOpen={isDeleteDialogOpen}
                isLoading={isDeleting}
                description="Are you sure you want to delete this file?"
                onDelete={handleDeleteFiles}
                onOpenChange={handleTriggerDeleteDialog}
            />

            <VaultItemPreviewSheet
                organizationId={organizationId}
                file={file}
                isOpen={isPreviewSheetOpen}
                onClose={() => setIsPreviewSheetOpen(false)}
            />
        </>
    )
}
