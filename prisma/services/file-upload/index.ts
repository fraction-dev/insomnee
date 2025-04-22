import { FileUpload as PrismaFileUpload } from '@prisma/client'
import { prisma } from 'prisma/db'

import { FileUpload } from '~/services/file-upload/model'
import { User } from '~/services/user/model'

type FileUploadWithRelations = PrismaFileUpload & {
    createdByUser: User
}

export const createFileUpload = async (fileUpload: Omit<PrismaFileUpload, 'organizationTransactionId'>): Promise<FileUpload> => {
    const record = await prisma.fileUpload.create({
        data: {
            ...fileUpload,
        },
        include: {
            createdByUser: true,
        },
    })

    return mapPrismaFileUploadToFileUpload(record)
}

const mapPrismaFileUploadToFileUpload = (prismaFileUpload: FileUploadWithRelations): FileUpload => {
    return {
        id: prismaFileUpload.id,
        name: prismaFileUpload.name,
        type: prismaFileUpload.type,
        mimeType: prismaFileUpload.mimeType,
        accessType: prismaFileUpload.accessType,
        size: prismaFileUpload.size,
        url: prismaFileUpload.url,
        createdAt: prismaFileUpload.createdAt,
        updatedAt: prismaFileUpload.updatedAt,
    }
}
