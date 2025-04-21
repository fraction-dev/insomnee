import { TransactionsView } from '~/components/transactions/transactions-view'
import { getOrganizationTransactionCategories } from '~/services/organization-transaction-category'

export default async function Page({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params

    const transactionCategories = await getOrganizationTransactionCategories(organizationId)

    return <TransactionsView organizationId={organizationId} transactionCategories={transactionCategories} />
}
