import { createId } from '@paralleldrive/cuid2'
import { NextResponse } from 'next/server'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { uploadFile } from '~/lib/server/bunny/api'
import { createFileUpload } from '~/services/file-upload'

import { baseUserSchema } from '../schemas'

export const POST = createRouteHandler()({ auth: true, paramsSchema: baseUserSchema }, async ({ body, params }) => {
    const { userId } = params
    const formData = body as FormData
    const file = formData.get('file') as File

    const fileName = file.name.split('.')
    const fileExtension = fileName[fileName.length - 1]

    const uploadedFile = await uploadFile(`/files/user-${userId}/${createId()}.${fileExtension}`, file)

    const fileUpload = await createFileUpload(userId, {
        id: createId(),
        name: file.name,
        type: 'DOCUMENT',
        mimeType: file.type,
        accessType: 'PUBLIC',
        size: file.size,
        url: uploadedFile,
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    return NextResponse.json({ data: fileUpload })
})
