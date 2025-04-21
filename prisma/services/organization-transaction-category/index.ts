import { OrganizationTransactionCategory as PrismaOrganizationTransactionCategory } from '@prisma/client'
import { prisma } from 'prisma/db'
import {
    DEFAULT_ORGANIZATION_TRANSACTION_CATEGORIES,
    DEFAULT_ORGANIZATION_TRANSACTION_CATEGORY_COLORS,
} from '~/services/organization-transaction-category/consts'
import { ORGANIZATION_BASE_TRANSACTION_CATEGORY, OrganizationTransactionCategory } from '~/services/organization-transaction-category/model'

export const bootstrapOrganizationTransactionCategories = async (organizationId: string) => {
    const categories = DEFAULT_ORGANIZATION_TRANSACTION_CATEGORIES.map((category) => ({
        type: category,
        organizationId,
        color: DEFAULT_ORGANIZATION_TRANSACTION_CATEGORY_COLORS[category],
    }))

    await prisma.organizationTransactionCategory.createMany({
        data: categories,
    })
}

export const getOrganizationTransactionCategories = async (organizationId: string) => {
    const prismaOrganizationTransactionCategories = await prisma.organizationTransactionCategory.findMany({
        where: {
            organizationId,
        },
    })

    return prismaOrganizationTransactionCategories.map(mapPrismaOrganizationTransactionCategoryToOrganizationTransactionCategory)
}

const mapPrismaOrganizationTransactionCategoryToOrganizationTransactionCategory = (
    prismaOrganizationTransactionCategory: PrismaOrganizationTransactionCategory,
): OrganizationTransactionCategory => {
    return {
        id: prismaOrganizationTransactionCategory.id,
        type: prismaOrganizationTransactionCategory.type as ORGANIZATION_BASE_TRANSACTION_CATEGORY,
        color: prismaOrganizationTransactionCategory.color ?? '#000000',
    }
}
