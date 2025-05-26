import { TransactionCategory as PrismaTransactionCategory } from '@prisma/client'
import { prisma } from 'prisma/db'

import {
    DEFAULT_ORGANIZATION_TRANSACTION_CATEGORIES,
    DEFAULT_ORGANIZATION_TRANSACTION_CATEGORY_COLORS,
} from '~/services/transaction-category/consts'
import { BASE_TRANSACTION_CATEGORY, TransactionCategory } from '~/services/transaction-category/model'

export const bootstrapOrganizationTransactionCategories = async (organizationId: string) => {
    const categories = DEFAULT_ORGANIZATION_TRANSACTION_CATEGORIES.map((category) => ({
        type: category,
        organizationId,
        color: DEFAULT_ORGANIZATION_TRANSACTION_CATEGORY_COLORS[category],
    }))

    await prisma.transactionCategory.createMany({
        data: categories,
    })
}

export const getOrganizationTransactionCategories = async (organizationId: string) => {
    const prismaTransactionCategories = await prisma.transactionCategory.findMany({
        where: {
            organizationId,
        },
    })

    return prismaTransactionCategories.map(mapPrismaTransactionCategoryToTransactionCategory)
}

const mapPrismaTransactionCategoryToTransactionCategory = (prismaTransactionCategory: PrismaTransactionCategory): TransactionCategory => {
    return {
        id: prismaTransactionCategory.id,
        type: prismaTransactionCategory.type as BASE_TRANSACTION_CATEGORY,
        color: prismaTransactionCategory.color ?? '#000000',
    }
}
