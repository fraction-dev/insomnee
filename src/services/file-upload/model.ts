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
}
