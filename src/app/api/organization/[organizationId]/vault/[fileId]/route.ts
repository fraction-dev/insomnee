import { NextResponse } from 'next/server'
import { getFileById } from 'prisma/services/file-upload'
import { z } from 'zod'

import { Params } from '~/app/api/organization/[organizationId]/schemas'
import { NotFoundException } from '~/core/exception'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { FileUpload } from '~/services/file-upload/model'
import { BaseResponse } from '~/types/response'

const paramsSchema = Params.merge(z.object({ fileId: z.string() }))

export const GET = createRouteHandler<BaseResponse<FileUpload>>()({ auth: true, paramsSchema }, async ({ params }) => {
    const { fileId } = params

    const file = await getFileById(fileId)
    if (!file) {
        throw new NotFoundException(`File with id ${fileId} not found`)
    }

    return NextResponse.json({ data: file })
})
