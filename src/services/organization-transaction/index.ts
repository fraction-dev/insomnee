import * as OrganizationTransactionDB from 'prisma/services/organization-transaction'

import { OrganizationTransactionCreate, OrganizationTransactionUpdate } from './model'

export const getOrganizationTransactions = async (organizationId: string, startDate?: Date, endDate?: Date) => {
    return OrganizationTransactionDB.getOrganizationTransactions(organizationId, startDate, endDate)
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

export const addFileToTransaction = async (transactionId: string, fileId: string) => {
    return OrganizationTransactionDB.addFileToTransaction(transactionId, fileId)
}

export const removeFileFromTransaction = async (transactionId: string, fileId: string) => {
    return OrganizationTransactionDB.removeFileFromTransaction(transactionId, fileId)
}
