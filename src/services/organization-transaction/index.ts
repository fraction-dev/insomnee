import { faker } from '@faker-js/faker'
import { prisma } from 'prisma/db'
import * as OrganizationTransactionDB from 'prisma/services/organization-transaction'

import { getOrganizationTransactionCategories } from '../organization-transaction-category'
import { OrganizationTransactionCreate, OrganizationTransactionUpdate } from './model'

/**
 * ! TEST PURPOSES ONLY !
 * Create dummy transactions for an organization
 */
export const createOrganizationDummyTransactions = async (organizationId: string) => {
    const transactionCategories = await getOrganizationTransactionCategories(organizationId)

    const transactions = transactionCategories.map((category) => ({
        organizationId,
        categoryId: category.id,
        amount: parseInt(Math.random() * 1000 + ''),
        currency: faker.finance.currencyCode(),
        date: faker.date.recent(),
        description: faker.lorem.sentence(),
    }))

    await prisma.organizationTransaction.createMany({
        data: transactions,
    })
}

export const getOrganizationTransactions = async (organizationId: string) => {
    return OrganizationTransactionDB.getOrganizationTransactions(organizationId)
}

export const createOrganizationTransaction = async (organizationId: string, organizationTransaction: OrganizationTransactionCreate) => {
    return OrganizationTransactionDB.createOrganizationTransaction(organizationId, organizationTransaction)
}

export const updateTransaction = async (transactionId: string, organizationTransaction: OrganizationTransactionUpdate) => {
    return OrganizationTransactionDB.updateTransaction(transactionId, organizationTransaction)
}

export const deleteTransactions = async (organizationId: string, transactionIds: string[]) => {
    return OrganizationTransactionDB.deleteTransactions(organizationId, transactionIds)
}
