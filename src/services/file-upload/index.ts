import * as FileUploadDB from 'prisma/services/file-upload'

import { FileUpload, FileUploadPayload } from './model'

export const createFileUpload = (userId: string, organizationId: string, fileUpload: FileUploadPayload): Promise<FileUpload> => {
    return FileUploadDB.createFileUpload(userId, organizationId, fileUpload)
}

export const getPublicFileUploads = (userId: string, organizationId: string): Promise<FileUpload[]> => {
    return FileUploadDB.getPublicFileUploads(userId, organizationId)
}

export const deleteManyFileUploads = (organizationId: string, ids: string[]): Promise<void> => {
    return FileUploadDB.deleteManyFileUploads(organizationId, ids)
}
