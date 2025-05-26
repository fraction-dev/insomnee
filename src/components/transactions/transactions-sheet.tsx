import { formatCurrency } from '~/lib/currency/format-currency'
import { formatDateToReadableString } from '~/lib/date/date'
import { OrganizationMember } from '~/services/organization/model'
import { TransactionCategory } from '~/services/transaction-category/model'
import { Transaction } from '~/services/transaction/model'

import { Sheet, SheetContent, SheetTitle } from '../ui/sheet'
import { TransactionForm } from './transaction-form'

interface Props {
    isOpen: boolean
    organizationId: string
    transaction?: Transaction
    transactionCategories: TransactionCategory[]
    transactions: Transaction[]
    organizationMembers: OrganizationMember[]
    onClose: () => void
}

export const TransactionsSheet = ({
    organizationId,
    transaction,
    transactionCategories,
    transactions,
    organizationMembers,
    isOpen,
    onClose,
}: Props) => {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="max-h-[calc(100vh-20px)] mt-3 mb-3 mr-3 rounded-xs p-4 gap-6 flex flex-col min-w-md pt-12">
                {!transaction && (
                    <SheetTitle>
                        <h3 className="text-lg font-medium">Create transaction</h3>
                    </SheetTitle>
                )}

                {transaction && (
                    <div className="flex flex-col gap-4">
                        <p className="text-xs font-light font-mono text-muted-foreground">{formatDateToReadableString(transaction.date)}</p>
                        <h4 className="text-base font-medium font-mono text-black">{transaction.description}</h4>
                        <h2 className="text-3xl font-medium font-mono text-black">
                            {formatCurrency(transaction.amount, transaction.currency)}
                        </h2>
                    </div>
                )}

                <TransactionForm
                    organizationMembers={organizationMembers}
                    organizationId={organizationId}
                    transaction={transaction}
                    transactionCategories={transactionCategories}
                    transactions={transactions}
                    onSubmit={onClose}
                />
            </SheetContent>
        </Sheet>
    )
}
