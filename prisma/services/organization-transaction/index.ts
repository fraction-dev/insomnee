import { OrganizationTransaction as PrismaOrganizationTransaction } from '@prisma/client'
import dayjs from 'dayjs'
import { prisma } from 'prisma/db'
import { ORGANIZATION_BASE_TRANSACTION_CATEGORY } from '~/services/organization-transaction-category/model'
import {
    OrganizationTransaction,
    OrganizationTransactionCreate,
    OrganizationTransactionUpdate,
} from '~/services/organization-transaction/model'
import { User } from '~/services/user/model'

type PrismaOrganizationTransactionWithRelations = PrismaOrganizationTransaction & {
    category: {
        id: string
        createdAt: Date
        updatedAt: Date
        organizationId: string
        type: string
        color: string | null
    }
    assignedToUser: User | null
}

export const getOrganizationTransactions = async (organizationId: string): Promise<OrganizationTransaction[]> => {
    const prismaOrganizationTransactions = await prisma.organizationTransaction.findMany({
        where: {
            organizationId,
        },
        include: {
            category: true,
            assignedToUser: true,
        },
        orderBy: {
            date: 'desc',
        },
    })

    return prismaOrganizationTransactions.map(mapPrismaOrganizationTransactionToOrganizationTransaction)
}

export const createOrganizationTransaction = async (organizationId: string, organizationTransaction: OrganizationTransactionCreate) => {
    const prismaOrganizationTransaction = await prisma.organizationTransaction.create({
        data: {
            description: organizationTransaction.description,
            amount: organizationTransaction.amount,
            currency: organizationTransaction.currency,
            date: organizationTransaction.date,
            categoryId: organizationTransaction.categoryId,
            assignedTo: organizationTransaction.assignedTo,
            attachmentUrl: organizationTransaction.attachmentUrl,
            notes: organizationTransaction.notes,
            organizationId,
        },
        include: {
            category: true,
            assignedToUser: true,
        },
    })

    return mapPrismaOrganizationTransactionToOrganizationTransaction(prismaOrganizationTransaction)
}

export const updateTransaction = async (transactionId: string, transaction: OrganizationTransactionUpdate) => {
    const prismaOrganizationTransaction = await prisma.organizationTransaction.update({
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
        include: {
            category: true,
            assignedToUser: true,
        },
    })

    return mapPrismaOrganizationTransactionToOrganizationTransaction(prismaOrganizationTransaction)
}

export const deleteTransactions = async (organizationId: string, transactionIds: string[]) => {
    await prisma.organizationTransaction.deleteMany({
        where: {
            id: { in: transactionIds },
            organizationId,
        },
    })
}

const mapPrismaOrganizationTransactionToOrganizationTransaction = (
    prismaOrganizationTransaction: PrismaOrganizationTransactionWithRelations,
): OrganizationTransaction => {
    return {
        id: prismaOrganizationTransaction.id,
        description: prismaOrganizationTransaction.description,
        amount: prismaOrganizationTransaction.amount,
        currency: prismaOrganizationTransaction.currency,
        date: dayjs(prismaOrganizationTransaction.date).toDate(),
        category: {
            id: prismaOrganizationTransaction.category.id,
            type: prismaOrganizationTransaction.category.type as ORGANIZATION_BASE_TRANSACTION_CATEGORY,
            color: prismaOrganizationTransaction.category.color ?? '#000000',
        },
        assignedTo: prismaOrganizationTransaction.assignedToUser ?? null,
        attachmentUrl: prismaOrganizationTransaction.attachmentUrl,
        notes: prismaOrganizationTransaction.notes,
        createdAt: prismaOrganizationTransaction.createdAt,
        updatedAt: prismaOrganizationTransaction.updatedAt,
    }
}
