import { FileUpload as PrismaFileUpload, Transaction as PrismaTransaction, User as PrismaUser } from '@prisma/client'
import dayjs from 'dayjs'
import { prisma } from 'prisma/db'

import { BASE_TRANSACTION_CATEGORY } from '~/services/transaction-category/model'
import { Transaction, TransactionCreate, TransactionUpdate } from '~/services/transaction/model'

import { mapPrismaFileUploadToFileUpload } from '../file-upload'

type PrismaTransactionWithRelations = PrismaTransaction & {
    category: {
        id: string
        createdAt: Date
        updatedAt: Date
        organizationId: string
        type: string
        color: string | null
    }
    assignedToUser: PrismaUser | null
    files: (PrismaFileUpload & {
        createdByUser: PrismaUser
    })[]
}

const INCLUDE_CLAUSE = {
    category: true,
    assignedToUser: true,
    files: {
        include: {
            createdByUser: true,
        },
    },
}

export const getTransactions = async (organizationId: string, startDate?: Date, endDate?: Date): Promise<Transaction[]> => {
    const prismaTransactions = await prisma.transaction.findMany({
        where: {
            organizationId,
            createdAt: {
                gte: startDate ?? undefined,
                lte: endDate ?? undefined,
            },
        },
        include: INCLUDE_CLAUSE,
        orderBy: {
            date: 'desc',
        },
    })

    return prismaTransactions.map(mapPrismaTransactionToTransaction)
}

export const createTransaction = async (organizationId: string, transaction: TransactionCreate) => {
    const prismaTransaction = await prisma.transaction.create({
        data: {
            description: transaction.description,
            amount: transaction.amount,
            currency: transaction.currency,
            date: transaction.date,
            categoryId: transaction.categoryId,
            assignedTo: transaction.assignedTo,
            attachmentUrl: transaction.attachmentUrl,
            notes: transaction.notes,
            organizationId,
            files: {
                connect: transaction.files.map((file) => ({ id: file })),
            },
        },
        include: INCLUDE_CLAUSE,
    })

    return mapPrismaTransactionToTransaction(prismaTransaction)
}

export const updateTransaction = async (transactionId: string, transaction: TransactionUpdate) => {
    const prismaTransaction = await prisma.transaction.update({
        where: {
            id: transactionId,
        },
        data: {
            description: transaction.description ?? undefined,
            amount: transaction.amount ?? undefined,
            currency: transaction.currency ?? undefined,
            categoryId: transaction.categoryId ?? undefined,
            notes: transaction.notes ?? undefined,
            assignedTo: transaction.assignedTo ?? undefined,
        },
        include: INCLUDE_CLAUSE,
    })

    return mapPrismaTransactionToTransaction(prismaTransaction)
}

export const deleteTransactions = async (organizationId: string, transactionIds: string[]) => {
    await prisma.transaction.deleteMany({
        where: {
            id: { in: transactionIds },
            organizationId,
        },
    })
}

export const addFileToTransaction = async (transactionId: string, fileId: string) => {
    await prisma.transaction.update({
        where: { id: transactionId },
        data: {
            files: {
                connect: { id: fileId },
            },
        },
    })
}

export const removeFileFromTransaction = async (transactionId: string, fileId: string) => {
    await prisma.transaction.update({
        where: { id: transactionId },
        data: { files: { disconnect: { id: fileId } } },
    })
}

const mapPrismaTransactionToTransaction = (prismaTransaction: PrismaTransactionWithRelations): Transaction => {
    return {
        id: prismaTransaction.id,
        description: prismaTransaction.description,
        amount: prismaTransaction.amount,
        currency: prismaTransaction.currency,
        date: dayjs(prismaTransaction.date).toDate(),
        category: {
            id: prismaTransaction.category.id,
            type: prismaTransaction.category.type as BASE_TRANSACTION_CATEGORY,
            color: prismaTransaction.category.color ?? '#000000',
        },
        assignedTo: prismaTransaction.assignedToUser
            ? {
                  id: prismaTransaction.assignedToUser.id,
                  image: prismaTransaction.assignedToUser.image,
                  name: prismaTransaction.assignedToUser.name || prismaTransaction.assignedToUser.email,
                  email: prismaTransaction.assignedToUser.email,
                  emailVerified: prismaTransaction.assignedToUser.emailVerified,
                  createdAt: prismaTransaction.assignedToUser.createdAt,
                  updatedAt: prismaTransaction.assignedToUser.updatedAt,
              }
            : null,
        attachmentUrl: prismaTransaction.attachmentUrl,
        notes: prismaTransaction.notes,
        createdAt: prismaTransaction.createdAt,
        updatedAt: prismaTransaction.updatedAt,
        files: prismaTransaction.files.map(mapPrismaFileUploadToFileUpload),
    }
}

export const getTotalTransactionsCount = async (): Promise<number> => {
    const count = await prisma.transaction.count()

    return count
}
