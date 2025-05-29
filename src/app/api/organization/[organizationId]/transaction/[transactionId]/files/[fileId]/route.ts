import { NextResponse } from 'next/server'
import { z } from 'zod'

import { Params } from '~/app/api/organization/[organizationId]/schemas'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { removeFileFromTransaction } from '~/services/transaction'

const paramsSchema = Params.merge(z.object({ transactionId: z.string(), fileId: z.string() }))

export const DELETE = createRouteHandler()({ auth: true, paramsSchema }, async ({ params }) => {
    const { transactionId, fileId } = params

    await removeFileFromTransaction(transactionId, fileId)

    return NextResponse.json({ data: null })
})
