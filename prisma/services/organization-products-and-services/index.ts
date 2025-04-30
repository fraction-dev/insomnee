import { OrganizationProductsAndServices as PrismaOrganizationProductsAndServices } from '@prisma/client'
import { prisma } from 'prisma/db'
import { FileUpload } from '~/services/file-upload/model'
import { OrganizationProductAndServiceNotFoundError } from '~/services/organization-products-and-services/errors'
import {
    OrganizationProductsAndServices,
    OrganizationProductsAndServicesCreate,
    OrganizationProductsAndServicesUpdate,
} from '~/services/organization-products-and-services/model'

type OrganizationProductsAndServicesWithRelations = PrismaOrganizationProductsAndServices & {
    files: FileUpload[]
}

const INCLUDE_CLAUSE = {
    files: true,
}

export const createOrganizationProductsAndServices = async (organizationId: string, data: OrganizationProductsAndServicesCreate) => {
    const record = await prisma.organizationProductsAndServices.create({
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

export const updateOrganizationProductAndService = async (id: string, data: Partial<OrganizationProductsAndServicesUpdate>) => {
    const record = await prisma.organizationProductsAndServices.findUnique({
        where: { id },
        include: INCLUDE_CLAUSE,
    })

    if (!record) {
        throw OrganizationProductAndServiceNotFoundError(id)
    }

    const updated = await prisma.organizationProductsAndServices.update({
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
    const records = await prisma.organizationProductsAndServices.findMany({
        where: { organizationId },
        include: INCLUDE_CLAUSE,
        orderBy: {
            updatedAt: 'desc',
        },
    })

    return records.map(mapPrismaOrganizationProductsAndServicesToModel)
}

export const deleteOrganizationProductsAndServices = async (organizationId: string, ids: string[]) => {
    await prisma.organizationProductsAndServices.deleteMany({
        where: { organizationId, id: { in: ids } },
    })
}

export const getOrganizationProductsAndServicesCount = async (organizationId: string) => {
    const count = await prisma.organizationProductsAndServices.count({
        where: { organizationId },
    })

    return count
}

const mapPrismaOrganizationProductsAndServicesToModel = (
    data: OrganizationProductsAndServicesWithRelations,
): OrganizationProductsAndServices => {
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
