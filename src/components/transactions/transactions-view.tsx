'use client'

import { useState } from 'react'

import { useOrganizationMembers } from '~/hooks/organization-member/useOrganizationMembers'
import { useOrganizationTransactions } from '~/hooks/organization-transaction/useOrganizationTransactions'
import { useOrganizationTransactionSheet } from '~/hooks/organization-transaction/useOrganizationTransactionSheet'
import { OrganizationTransaction } from '~/services/organization-transaction/model'
import { OrganizationTransactionCategory } from '~/services/organization-transaction-category/model'

import { TransactionsHeader } from './transactions-header'
import { TransactionsSheet } from './transactions-sheet'
import { TransactionsTable } from './transactions-table/transactions-table'
import { TransactionsViewSkeleton } from './transactions-view-skeleton'

interface Props {
    organizationId: string
    transactionCategories: OrganizationTransactionCategory[]
}

export const TransactionsView = ({ organizationId, transactionCategories }: Props) => {
    const { data, isLoading, isPending } = useOrganizationTransactions(organizationId)
    const { data: organizationMembers } = useOrganizationMembers(organizationId)
    const { isSheetOpen, transactionId, handleCleanQueryParams } = useOrganizationTransactionSheet()

    const [selectedTransactions, setSelectedTransactions] = useState<OrganizationTransaction[]>([])

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

const getTransaction = (transactions: OrganizationTransaction[], transactionId: string | null) => {
    if (!transactionId) {
        return undefined
    }

    return transactions.find((transaction) => transaction.id === transactionId)
}
