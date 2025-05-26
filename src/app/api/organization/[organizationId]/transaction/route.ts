import { NextResponse } from 'next/server'
import { z } from 'zod'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { createTransaction, getTransactions } from '~/services/transaction'
import { Transaction } from '~/services/transaction/model'

import { baseOrganizationIdSchema } from '../schemas'

export const GET = createRouteHandler<Transaction[]>()({ auth: true, paramsSchema: baseOrganizationIdSchema }, async ({ params }) => {
    const { organizationId } = params

    const transactions = await getTransactions(organizationId)

    return NextResponse.json({ data: transactions })
})

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

export const POST = createRouteHandler<Transaction>()(
    { auth: true, paramsSchema: baseOrganizationIdSchema, bodySchema: bodySchema },
    async ({ params, body }) => {
        const { organizationId } = params
        const { description, amount, currency, categoryId, notes, assignedTo, files } = body

        const transaction = await createTransaction(organizationId, {
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
