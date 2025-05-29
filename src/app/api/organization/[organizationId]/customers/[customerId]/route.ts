import { NextResponse } from 'next/server'
import { z } from 'zod'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { updateCustomer } from '~/services/customer'
import { Customer, customerUpdateSchema } from '~/services/customer/model'
import { BaseResponse } from '~/types/response'

import { Params } from '../../schemas'

export const paramsSchema = Params.merge(
    z.object({
        customerId: z.string(),
    }),
)

export const PUT = createRouteHandler<BaseResponse<Customer>>()(
    { auth: true, paramsSchema, bodySchema: customerUpdateSchema },
    async ({ params, body, userId }) => {
        const { organizationId, customerId } = params

        const customer = await updateCustomer(userId, organizationId, {
            id: customerId,
            name: body.name,
            email: body.email,
            websiteUrl: body.websiteUrl,
            contactPerson: body.contactPerson,
            phoneNumber: body.phoneNumber,
            country: body.country,
            city: body.city,
            notes: body.notes,
            vatNumber: body.vatNumber,
            state: body.state,
            zipCode: body.zipCode,
            addressLine1: body.addressLine1,
            addressLine2: body.addressLine2,
            status: body.status ?? 'ACTIVE',
        })

        return NextResponse.json({ data: customer })
    },
)
