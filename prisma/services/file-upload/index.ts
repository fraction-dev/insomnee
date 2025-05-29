import { FileUpload as PrismaFileUpload, User as PrismaUser } from '@prisma/client'
import { prisma } from 'prisma/db'

import { FileUpload, FileUploadPayload, FileUploadUpdatePayload } from '~/services/file-upload/model'

type FileUploadWithRelations = PrismaFileUpload & {
    createdByUser: PrismaUser
}

const INCLUDE_CLAUSE = {
    createdByUser: true,
}

export const createFileUpload = async (userId: string, organizationId: string, fileUpload: FileUploadPayload): Promise<FileUpload> => {
    const record = await prisma.fileUpload.create({
        data: {
            name: fileUpload.name,
            type: fileUpload.type,
            mimeType: fileUpload.mimeType,
            accessType: fileUpload.accessType,
            size: fileUpload.size,
            url: fileUpload.url,
            status: fileUpload.status,
            createdBy: userId,
            organizationId,
        },
        include: INCLUDE_CLAUSE,
    })

    return mapPrismaFileUploadToFileUpload(record)
}

export const getPublicFileUploads = async (userId: string, organizationId: string): Promise<FileUpload[]> => {
    const records = await prisma.fileUpload.findMany({
        where: {
            accessType: 'PUBLIC',
            createdBy: userId,
            organizationId,
        },
        include: INCLUDE_CLAUSE,
        orderBy: {
            createdAt: 'desc',
        },
    })

    return records.map(mapPrismaFileUploadToFileUpload)
}

export const getFileById = async (id: string): Promise<FileUpload | null> => {
    const record = await prisma.fileUpload.findUnique({
        where: { id },
        include: INCLUDE_CLAUSE,
    })

    return record ? mapPrismaFileUploadToFileUpload(record) : null
}

export const updateFileUploadById = async (id: string, payload: FileUploadUpdatePayload): Promise<FileUpload> => {
    const record = await prisma.fileUpload.update({
        where: { id },
        data: {
            title: payload.title ?? undefined,
            description: payload.description ?? undefined,
            tags: payload.tags ?? undefined,
            status: payload.status ?? undefined,
        },
        include: INCLUDE_CLAUSE,
    })

    return mapPrismaFileUploadToFileUpload(record)
}

export const deleteManyFileUploads = async (organizationId: string, ids: string[]): Promise<void> => {
    await prisma.fileUpload.deleteMany({
        where: {
            id: { in: ids },
            accessType: 'PUBLIC',
            organizationId,
        },
    })
}

export const mapPrismaFileUploadToFileUpload = (prismaFileUpload: FileUploadWithRelations): FileUpload => {
    return {
        id: prismaFileUpload.id,
        name: prismaFileUpload.name,
        type: prismaFileUpload.type,
        mimeType: prismaFileUpload.mimeType,
        accessType: prismaFileUpload.accessType,
        size: prismaFileUpload.size,
        url: prismaFileUpload.url,
        title: prismaFileUpload.title ?? '',
        description: prismaFileUpload.description ?? '',
        tags: prismaFileUpload.tags ?? [],
        status: prismaFileUpload.status ?? 'COMPLETED',
        createdAt: prismaFileUpload.createdAt,
        updatedAt: prismaFileUpload.updatedAt,
    }
}
