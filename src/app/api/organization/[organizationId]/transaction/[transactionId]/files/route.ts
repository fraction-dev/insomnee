import { NextResponse } from 'next/server'
import { z } from 'zod'

import { Params } from '~/app/api/organization/[organizationId]/schemas'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { addFileToTransaction } from '~/services/transaction'

const paramsSchema = Params.merge(
    z.object({
        transactionId: z.string(),
    }),
)

const bodySchema = z.object({
    fileId: z.string(),
})

export const POST = createRouteHandler()({ auth: true, paramsSchema, bodySchema }, async ({ params, body }) => {
    const { transactionId } = params
    const { fileId } = body

    await addFileToTransaction(transactionId, fileId)

    return NextResponse.json({ data: null })
})
