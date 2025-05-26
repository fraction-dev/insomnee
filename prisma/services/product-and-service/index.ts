import { ProductAndService as PrismaProductAndService } from '@prisma/client'
import { prisma } from 'prisma/db'

import { FileUpload } from '~/services/file-upload/model'
import { OrganizationProductAndServiceNotFoundError } from '~/services/product-and-service/errors'
import { ProductAndService, ProductAndServiceCreate, ProductAndServiceUpdate } from '~/services/product-and-service/model'

type ProductAndServiceWithRelations = PrismaProductAndService & {
    files: FileUpload[]
}

const INCLUDE_CLAUSE = {
    files: true,
}

export const createOrganizationProductsAndServices = async (organizationId: string, data: ProductAndServiceCreate) => {
    const record = await prisma.productAndService.create({
        data: {
            ...data,
            organizationId,
            files: {
                connect: data.files.map((file) => ({ id: file })),
            },
        },
        include: INCLUDE_CLAUSE,
    })

    return mapPrismaOrganizationProductsAndServicesToModel(record)
}

export const updateOrganizationProductAndService = async (id: string, data: Partial<ProductAndServiceUpdate>) => {
    const record = await prisma.productAndService.findUnique({
        where: { id },
        include: INCLUDE_CLAUSE,
    })

    if (!record) {
        throw OrganizationProductAndServiceNotFoundError(id)
    }

    const updated = await prisma.productAndService.update({
        where: { id },
        data: {
            name: data.name ?? undefined,
            description: data.description ?? undefined,
            price: data.price ?? undefined,
            currency: data.currency ?? undefined,
            websiteUrlLink: data.websiteUrlLink ?? undefined,
            files: {
                disconnect: record.files.map((file) => ({ id: file.id })),
                connect: data.files?.map((file) => ({ id: file })),
            },
        },
        include: INCLUDE_CLAUSE,
    })

    return mapPrismaOrganizationProductsAndServicesToModel(updated)
}

export const getOrganizationProductsAndServices = async (organizationId: string) => {
    const records = await prisma.productAndService.findMany({
        where: { organizationId },
        include: INCLUDE_CLAUSE,
        orderBy: {
            updatedAt: 'desc',
        },
    })

    return records.map(mapPrismaOrganizationProductsAndServicesToModel)
}

export const deleteOrganizationProductsAndServices = async (organizationId: string, ids: string[]) => {
    await prisma.productAndService.deleteMany({
        where: { organizationId, id: { in: ids } },
    })
}

export const getOrganizationProductsAndServicesCount = async (organizationId: string) => {
    const count = await prisma.productAndService.count({
        where: { organizationId },
    })

    return count
}

const mapPrismaOrganizationProductsAndServicesToModel = (data: ProductAndServiceWithRelations): ProductAndService => {
    return {
        id: data.id,
        name: data.name,
        description: data.description ?? undefined,
        price: data.price ?? 0,
        currency: data.currency ?? 'MDL',
        status: data.status,
        files: data.files,
        websiteUrlLink: data.websiteUrlLink ?? undefined,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    }
}
