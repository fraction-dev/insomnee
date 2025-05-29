/**
 * Endpoint to upload PRIVATE user files to the server.
 *
 * "PRIVATE" files are only used for internal usage,
 * like organization logo, invoice image, customer image uploads, etc.
 * They should not be accessible to the public.
 *
 * "PUBLIC" files are accessible to the public. They can be listed in the public file list.
 *
 * Body for the request must be a FormData object.
 */

import { createId } from '@paralleldrive/cuid2'
import { tasks } from '@trigger.dev/sdk/v3'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { BadRequestException } from '~/core/exception'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { uploadFile } from '~/lib/server/bunny/api'
import { createFileUpload } from '~/services/file-upload'
import { SUPPORTED_AI_PROCESSING_MIME_TYPES } from '~/services/file-upload/consts'
import { FileUpload, FileUploadStatus } from '~/services/file-upload/model'
import { executeFileAIDetails } from '~/trigger/tasks/execute-file-ai-details'
import { TriggerTasks } from '~/trigger/types/tasks'
import { BaseResponse } from '~/types/response'

import { Params } from '../schemas'

const ACCEPTABLE_ACCESS_TYPES = ['PRIVATE', 'PUBLIC'] as const

const querySchema = z.object({
    accessType: z.enum(ACCEPTABLE_ACCESS_TYPES),
})

export const POST = createRouteHandler<BaseResponse<FileUpload>>()(
    { auth: true, querySchema, paramsSchema: Params },
    async ({ userId, body, query, params }) => {
        const { accessType } = query
        const { organizationId } = params

        if (!accessType || !ACCEPTABLE_ACCESS_TYPES.includes(accessType)) {
            throw new BadRequestException(`Invalid access type: ${accessType}`)
        }

        const formData = body as FormData
        const file = formData.get('file') as File

        const fileName = file.name.split('.')
        const fileExtension = fileName[fileName.length - 1]

        /**
         * Upload file to the storage.
         */
        const path = `/files/${userId}/${createId()}.${fileExtension}`
        const uploadedStorageFileUrl = await uploadFile(path, file)

        /**
         * Save file record in the database.
         */
        let status: FileUploadStatus = 'COMPLETED'
        const isSupportedMimeType = SUPPORTED_AI_PROCESSING_MIME_TYPES.includes(file.type)

        if (isSupportedMimeType && accessType === 'PUBLIC') {
            status = 'PROCESSING'
        }

        const fileUpload = await createFileUpload(userId, organizationId, {
            accessType,
            status,
            name: file.name,
            type: 'DOCUMENT',
            mimeType: file.type,
            size: file.size,
            url: uploadedStorageFileUrl,
        })

        /**
         * Execute the file AI details task
         */
        await tasks.trigger<typeof executeFileAIDetails>(TriggerTasks.EXECUTE_FILE_AI_DETAILS, {
            organizationId,
            fileId: fileUpload.id,
        })

        return NextResponse.json({ data: fileUpload })
    },
)
