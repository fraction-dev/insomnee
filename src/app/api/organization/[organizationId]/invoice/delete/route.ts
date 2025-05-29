import { NextResponse } from 'next/server'
import { z } from 'zod'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { deleteManyInvoices } from '~/services/invoice'
import { BaseResponse } from '~/types/response'

import { Params } from '../../schemas'

const bodySchema = z.object({
    ids: z.array(z.string()),
})

export const POST = createRouteHandler<BaseResponse<{ status: string }>>()(
    { auth: true, paramsSchema: Params, bodySchema },
    async ({ params, body, userId }) => {
        const { organizationId } = params

        await deleteManyInvoices(userId, organizationId, body.ids)

        return NextResponse.json({ data: { status: 'success' } })
    },
)
