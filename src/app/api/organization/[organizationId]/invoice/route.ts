import { NextResponse } from 'next/server'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { createInvoice, getInvoices } from '~/services/invoice'
import { createInvoiceSchema, Invoice } from '~/services/invoice/model'
import { BaseResponse } from '~/types/response'

import { baseOrganizationIdSchema } from '../schemas'

export const POST = createRouteHandler<BaseResponse<Invoice>>()(
    { auth: true, body: createInvoiceSchema, paramsSchema: baseOrganizationIdSchema },
    async ({ params, body, userId }) => {
        const { organizationId } = params

        const invoice = await createInvoice(userId, organizationId, {
            title: body.title,
            number: body.number,
            imageUrl: body.imageUrl,
            dateFormat: body.dateFormat,
            currency: body.currency,
            issueDate: body.issueDate,
            dueDate: body.dueDate,
            from: body.from,
            customerId: body.customerId,
            items: body.items,
            discount: body.discount,
            vat: body.vat,
            tax: body.tax,
            paymentDetails: body.paymentDetails,
            notes: body.notes,
        })

        return NextResponse.json({ data: invoice })
    },
)

export const GET = createRouteHandler<BaseResponse<Invoice[]>>()(
    { auth: true, paramsSchema: baseOrganizationIdSchema },
    async ({ params }) => {
        const { organizationId } = params

        const invoices = await getInvoices(organizationId)

        return NextResponse.json({ data: invoices })
    },
)
