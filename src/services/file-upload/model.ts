import { Organization } from '../organization/model'
import { User } from '../user/model'

export type FileUploadType = 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT' | 'OTHER' | 'KNOWLEDGE_BASE'
export type FileUploadAccessType = 'PUBLIC' | 'PRIVATE'

export interface FileUpload {
    id: string
    name: string
    type: FileUploadType
    mimeType: string
    accessType: FileUploadAccessType
    size: number
    url: string
    createdAt: Date
    updatedAt: Date
    createdByUser?: User
    organization?: Organization
    title?: string
    description?: string
    tags?: string[]
    status?: FileUploadStatus
}

export type FileUploadStatus = 'PROCESSING' | 'COMPLETED' | 'FAILED'

export type FileUploadPayload = Pick<FileUpload, 'name' | 'type' | 'mimeType' | 'accessType' | 'size' | 'url' | 'status'>

export type FileUploadUpdatePayload = Pick<FileUpload, 'title' | 'description' | 'tags' | 'status'>
