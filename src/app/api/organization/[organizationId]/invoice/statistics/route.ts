import { NextResponse } from 'next/server'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { getInvoicesStatistics } from '~/services/invoice'
import { InvoicesStatistics } from '~/services/invoice/model'
import { BaseResponse } from '~/types/response'

import { Params } from '../../schemas'

export const GET = createRouteHandler<BaseResponse<InvoicesStatistics>>()({ auth: true, paramsSchema: Params }, async ({ params }) => {
    const { organizationId } = params
    const statistics = await getInvoicesStatistics(organizationId)
    return NextResponse.json({ data: statistics })
})
