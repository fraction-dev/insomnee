import { NextResponse } from 'next/server'
import { z } from 'zod'

import { BadRequestException } from '~/core/exception'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { updateInvoice } from '~/services/invoice'
import { createInvoiceSchema, Invoice } from '~/services/invoice/model'
import { BaseResponse } from '~/types/response'

import { baseOrganizationIdSchema } from '../../schemas'

const paramsSchema = baseOrganizationIdSchema.merge(z.object({ invoiceId: z.string() }))

export const PATCH = createRouteHandler<BaseResponse<Invoice>>()(
    { auth: true, body: createInvoiceSchema, paramsSchema },
    async ({ params, body, userId }) => {
        const { organizationId, invoiceId } = params

        if (invoiceId !== body.id) {
            throw new BadRequestException('Invoice id does not match the path parameter')
        }

        const invoice = await updateInvoice(userId, organizationId, invoiceId, body)

        return NextResponse.json({ data: invoice })
    },
)
