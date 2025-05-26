import { MutateOptions } from '@tanstack/react-query'
import { PlusIcon, TrashIcon } from 'lucide-react'
import { ReactNode } from 'react'

import { cn } from '~/lib/shared/utils'

import { DeleteDialog } from '../shared/delete-dialog'
import { Button } from '../ui/button'

interface Props<T> {
    heading?: string | ReactNode
    selectedRows?: T[]
    deleteDialogTitle?: string
    deleteDialogDescription?: string
    isDeleteLoading?: boolean
    isDeleteDialogOpen?: boolean
    onCreateBtnClick?: () => void
    handleDelete?: (options?: MutateOptions) => void
    setIsDeleteDialogOpen?: (isOpen: boolean) => void
}

export const TableHeader = <T,>({
    heading,
    selectedRows,
    deleteDialogTitle,
    deleteDialogDescription,
    isDeleteLoading,
    isDeleteDialogOpen,
    onCreateBtnClick,
    handleDelete,
    setIsDeleteDialogOpen,
}: Props<T>) => {
    const handleDialogDelete = () => {
        handleDelete?.({ onSuccess: () => setIsDeleteDialogOpen?.(false) })
    }

    return (
        <>
            <div
                className={cn({
                    'flex justify-end items-center': !heading,
                    'flex justify-between items-center gap-12': heading,
                })}
            >
                {typeof heading === 'string' ? (
                    <p className="text-muted-foreground text-sm leading-relaxed font-normal">{heading}</p>
                ) : (
                    heading
                )}

                {selectedRows?.length && selectedRows.length > 0 ? (
                    <Button size="icon" variant="destructive" onClick={() => setIsDeleteDialogOpen?.(true)}>
                        <TrashIcon />
                    </Button>
                ) : (
                    <Button size="icon" variant="outline" onClick={onCreateBtnClick}>
                        <PlusIcon />
                    </Button>
                )}
            </div>

            <DeleteDialog
                title={deleteDialogTitle ?? 'Are you sure to delete these items?'}
                description={deleteDialogDescription ?? 'This action cannot be undone. This will permanently delete your items.'}
                isLoading={isDeleteLoading}
                isOpen={isDeleteDialogOpen ?? false}
                onOpenChange={setIsDeleteDialogOpen ?? (() => {})}
                onDelete={handleDialogDelete}
            />
        </>
    )
}
