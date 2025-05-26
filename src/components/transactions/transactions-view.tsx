'use client'

import { useState } from 'react'

import { useOrganizationMembers } from '~/hooks/organization-member/useOrganizationMembers'
import { useTransactions } from '~/hooks/transaction/useTransactions'
import { useTransactionSheet } from '~/hooks/transaction/useTransactionSheet'
import { TransactionCategory } from '~/services/transaction-category/model'
import { Transaction } from '~/services/transaction/model'

import { TransactionsHeader } from './transactions-header'
import { TransactionsSheet } from './transactions-sheet'
import { TransactionsTable } from './transactions-table/transactions-table'
import { TransactionsViewSkeleton } from './transactions-view-skeleton'

interface Props {
    organizationId: string
    transactionCategories: TransactionCategory[]
}

export const TransactionsView = ({ organizationId, transactionCategories }: Props) => {
    const { data, isLoading, isPending } = useTransactions(organizationId)
    const { data: organizationMembers } = useOrganizationMembers(organizationId)
    const { isSheetOpen, transactionId, handleCleanQueryParams } = useTransactionSheet()

    const [selectedTransactions, setSelectedTransactions] = useState<Transaction[]>([])

    if (isLoading || isPending) {
        return <TransactionsViewSkeleton />
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <TransactionsHeader
                    organizationId={organizationId}
                    selectedTransactions={selectedTransactions}
                    setSelectedTransactions={setSelectedTransactions}
                />

                <TransactionsTable
                    organizationId={organizationId}
                    transactions={data?.data ?? []}
                    selectedTransactions={selectedTransactions}
                    setSelectedTransactions={setSelectedTransactions}
                />
            </div>

            <TransactionsSheet
                organizationMembers={organizationMembers?.data ?? []}
                isOpen={Boolean(isSheetOpen)}
                organizationId={organizationId}
                transactionCategories={transactionCategories}
                transactions={data?.data ?? []}
                transaction={getTransaction(data?.data ?? [], transactionId)}
                onClose={handleCleanQueryParams}
            />
        </>
    )
}

const getTransaction = (transactions: Transaction[], transactionId: string | null) => {
    if (!transactionId) {
        return undefined
    }

    return transactions.find((transaction) => transaction.id === transactionId)
}
