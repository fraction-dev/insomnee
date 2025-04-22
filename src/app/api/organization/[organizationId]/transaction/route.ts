import { NextResponse } from 'next/server'
import { z } from 'zod'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { createOrganizationTransaction, getOrganizationTransactions } from '~/services/organization-transaction'
import { OrganizationTransaction } from '~/services/organization-transaction/model'

import { baseOrganizationIdSchema } from '../schemas'

export const GET = createRouteHandler<OrganizationTransaction[]>()(
    { auth: true, paramsSchema: baseOrganizationIdSchema },
    async ({ params }) => {
        const { organizationId } = params

        const transactions = await getOrganizationTransactions(organizationId)

        return NextResponse.json({ data: transactions })
    },
)

const bodySchema = z.object({
    description: z.string(),
    assignedTo: z.string(),
    amount: z.number().min(0),
    currency: z.string(),
    date: z.string(),
    categoryId: z.string(),
    notes: z.string().optional(),
    files: z.array(z.string()).optional(),
})

export const POST = createRouteHandler<OrganizationTransaction>()(
    { auth: true, paramsSchema: baseOrganizationIdSchema, bodySchema: bodySchema },
    async ({ params, body }) => {
        const { organizationId } = params
        const { description, amount, currency, categoryId, notes, assignedTo, files } = body

        const transaction = await createOrganizationTransaction(organizationId, {
            description,
            amount,
            currency,
            categoryId,
            notes: notes ?? null,
            date: new Date(),
            assignedTo: assignedTo,
            attachmentUrl: null,
            files: files ?? [],
        })

        return NextResponse.json({ data: transaction })
    },
)
