import { z } from 'zod'

export const fileUploadSchema = z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    type: z.string(),
    size: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    mimeType: z.string(),
    accessType: z.string(),
})

export type FileUpload = z.infer<typeof fileUploadSchema>
