import { Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { ROUTES } from '~/config/routes'
import { useCreateQueryString } from '~/hooks/shared/useCreateQueryString'
import { useDeleteTransactions } from '~/hooks/transaction/useDeleteTransactions'
import { Transaction } from '~/services/transaction/model'

import { DeleteDialog } from '../shared/delete-dialog'
import { Button } from '../ui/button'

interface Props {
    organizationId: string
    selectedTransactions: Transaction[]
    setSelectedTransactions: (transactions: Transaction[]) => void
}

export const TransactionsHeader = ({ organizationId, selectedTransactions, setSelectedTransactions }: Props) => {
    const { createQueryString } = useCreateQueryString()
    const { mutate: deleteTransactions, isPending: isDeletingTransactions } = useDeleteTransactions(organizationId)

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const handleDeleteTransactions = () => {
        deleteTransactions(
            selectedTransactions.map((transaction) => transaction.id),
            {
                onSuccess: () => {
                    setSelectedTransactions([])
                    setIsDeleteDialogOpen(false)
                },
            },
        )
    }

    return (
        <>
            <div className="flex items-center justify-end gap-12">
                <div className="flex items-center gap-2">
                    {selectedTransactions.length ? (
                        <Button variant="destructive" size="icon" onClick={() => setIsDeleteDialogOpen(true)}>
                            <Trash2 />
                        </Button>
                    ) : (
                        <Link
                            href={`${ROUTES.DASHBOARD.TRANSACTIONS(organizationId)}?${createQueryString('isCreatingTransaction', 'true')}`}
                        >
                            <Button size="icon" variant="outline">
                                <Plus />
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            <DeleteDialog
                description="This action cannot be undone. This will permanently delete your transactions."
                isOpen={isDeleteDialogOpen}
                isLoading={isDeletingTransactions}
                onOpenChange={setIsDeleteDialogOpen}
                onDelete={handleDeleteTransactions}
            />
        </>
    )
}
