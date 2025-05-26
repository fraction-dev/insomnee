import { NextResponse } from 'next/server'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { createCustomer, getOrganizationCustomers } from '~/services/customer'
import { Customer, customerCreateSchema } from '~/services/customer/model'
import { BaseResponse } from '~/types/response'

import { baseOrganizationIdSchema } from '../schemas'

export const POST = createRouteHandler<BaseResponse<Customer>>()(
    { auth: true, paramsSchema: baseOrganizationIdSchema, bodySchema: customerCreateSchema },
    async ({ params, body, userId }) => {
        const { organizationId } = params

        const customer = await createCustomer(userId, organizationId, body)

        return NextResponse.json({ data: customer })
    },
)

export const GET = createRouteHandler<BaseResponse<Customer[]>>()(
    { auth: true, paramsSchema: baseOrganizationIdSchema },
    async ({ params }) => {
        const { organizationId } = params

        const customers = await getOrganizationCustomers(organizationId)

        return NextResponse.json({ data: customers })
    },
)
