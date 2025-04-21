import * as OrganizationTransactionCategoryDB from 'prisma/services/organization-transaction-category'

export const bootstrapOrganizationTransactionCategories = async (organizationId: string) => {
    return OrganizationTransactionCategoryDB.bootstrapOrganizationTransactionCategories(organizationId)
}

export const getOrganizationTransactionCategories = async (organizationId: string) => {
    return OrganizationTransactionCategoryDB.getOrganizationTransactionCategories(organizationId)
}
