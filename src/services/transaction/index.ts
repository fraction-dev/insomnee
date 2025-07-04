import * as OrganizationTransactionDB from 'prisma/services/transaction'

import { TransactionCreate, TransactionUpdate } from './model'

export const getTransactions = async (organizationId: string, startDate?: Date, endDate?: Date) => {
    return OrganizationTransactionDB.getTransactions(organizationId, startDate, endDate)
}

export const createTransaction = async (organizationId: string, transaction: TransactionCreate) => {
    return OrganizationTransactionDB.createTransaction(organizationId, transaction)
}

export const updateTransaction = async (transactionId: string, transaction: TransactionUpdate) => {
    return OrganizationTransactionDB.updateTransaction(transactionId, transaction)
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

export const getTotalTransactionsCount = async (): Promise<number> => {
    return OrganizationTransactionDB.getTotalTransactionsCount()
}
