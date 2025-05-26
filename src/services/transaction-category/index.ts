import * as TransactionCategoryDB from 'prisma/services/transaction-category'

export const bootstrapOrganizationTransactionCategories = async (organizationId: string) => {
    return TransactionCategoryDB.bootstrapOrganizationTransactionCategories(organizationId)
}

export const getOrganizationTransactionCategories = async (organizationId: string) => {
    return TransactionCategoryDB.getOrganizationTransactionCategories(organizationId)
}
