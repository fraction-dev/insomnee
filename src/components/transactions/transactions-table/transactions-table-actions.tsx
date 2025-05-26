import { EllipsisVerticalIcon } from 'lucide-react'
import { useState } from 'react'

import { DeleteDialog } from '~/components/shared/delete-dialog'
import { ShareDialog } from '~/components/shared/dialogs/share-dialog'
import { Button } from '~/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { useDeleteTransactions } from '~/hooks/transaction/useDeleteTransactions'
import { Transaction } from '~/services/transaction/model'

export const TransactionsTableActions = ({ transaction, organizationId }: { transaction: Transaction; organizationId: string }) => {
    const [activeDeleteTransactionId, setActiveDeleteTransactionId] = useState<string | null>(null)
    const [activeShareTransactionId, setActiveShareTransactionId] = useState<string | null>(null)
    const { mutate: deleteTransactions, isPending: isDeleting } = useDeleteTransactions(organizationId)

    const handleDeleteTransaction = () => {
        if (activeDeleteTransactionId) {
            deleteTransactions([activeDeleteTransactionId], {
                onSuccess: () => {
                    setActiveDeleteTransactionId(null)
                },
            })
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="text-center" onClick={(e) => e.stopPropagation()}>
                        <EllipsisVerticalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="left">
                    <DropdownMenuItem onSelect={() => setActiveShareTransactionId(transaction.id)}>Share</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onSelect={() => setActiveDeleteTransactionId(transaction.id)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteDialog
                isOpen={!!activeDeleteTransactionId}
                isLoading={isDeleting}
                description="Are you sure you want to delete this transaction?"
                onDelete={handleDeleteTransaction}
                onOpenChange={() => setActiveDeleteTransactionId(null)}
            />

            <ShareDialog
                isOpen={!!activeShareTransactionId}
                url={`${window.location.origin}/transactions?transactionId=${activeShareTransactionId}`}
                onOpenChange={() => setActiveShareTransactionId(null)}
                onCopy={() => {
                    setActiveShareTransactionId(null)
                }}
            />
        </>
    )
}
