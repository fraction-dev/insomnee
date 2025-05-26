import { NextResponse } from 'next/server'
import { z } from 'zod'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { deleteTransactions } from '~/services/transaction'

import { baseOrganizationIdSchema } from '../../schemas'

const bodySchema = z.object({
    transactionIds: z.array(z.string()),
})

export const POST = createRouteHandler()({ auth: true, bodySchema, paramsSchema: baseOrganizationIdSchema }, async ({ body, params }) => {
    const { transactionIds } = body
    const { organizationId } = params

    await deleteTransactions(organizationId, transactionIds)

    return NextResponse.json({ data: null })
})
