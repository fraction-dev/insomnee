import { NextResponse } from 'next/server'
import { z } from 'zod'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { deleteManyFileUploads, getPublicFileUploads } from '~/services/file-upload'
import { FileUpload } from '~/services/file-upload/model'
import { BaseResponse } from '~/types/response'

import { Params } from '../schemas'

const querySchema = z.object({
    ids: z.string().min(1, 'At least one file ID is required'),
})

export const DELETE = createRouteHandler<BaseResponse<{}>>()(
    { auth: true, paramsSchema: Params, querySchema },
    async ({ query, params }) => {
        const { ids } = query
        const { organizationId } = params

        const idsArray = ids.split(',')

        await deleteManyFileUploads(organizationId, idsArray)

        return NextResponse.json({ data: {} })
    },
)

export const GET = createRouteHandler<BaseResponse<FileUpload[]>>()({ auth: true, paramsSchema: Params }, async ({ userId, params }) => {
    const { organizationId } = params

    const fileUploads = await getPublicFileUploads(userId, organizationId)

    return NextResponse.json({ data: fileUploads })
})
