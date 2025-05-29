import { NextResponse } from 'next/server'
import { archiveManyCustomers } from 'prisma/services/customer'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { customersDeleteManySchema } from '~/services/customer/model'

import { Params } from '../../schemas'

export const POST = createRouteHandler()(
    { auth: true, paramsSchema: Params, bodySchema: customersDeleteManySchema },
    async ({ params, body, userId }) => {
        const { organizationId } = params

        const customers = await archiveManyCustomers(userId, organizationId, body.ids)

        return NextResponse.json({ data: customers })
    },
)
