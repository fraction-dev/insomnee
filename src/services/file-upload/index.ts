import * as FileUploadDB from 'prisma/services/file-upload'

import { FileUpload } from './model'

export const createFileUpload = (userId: string, fileUpload: FileUpload): Promise<FileUpload> => {
    return FileUploadDB.createFileUpload({
        ...fileUpload,
        createdBy: userId,
    })
}
