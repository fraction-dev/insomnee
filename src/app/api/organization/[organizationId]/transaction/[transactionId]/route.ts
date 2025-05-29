import { NextResponse } from 'next/server'
import { z } from 'zod'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { updateTransaction } from '~/services/transaction'
import { Transaction } from '~/services/transaction/model'

import { Params } from '../../schemas'

const paramsSchema = Params.merge(z.object({ transactionId: z.string() }))

const bodySchema = z.object({
    description: z.string().optional(),
    notes: z.string().optional(),
    categoryId: z.string().optional(),
    amount: z.number().optional(),
    currency: z.string().optional(),
    date: z.string().optional(),
    attachmentUrl: z.string().optional(),
    assignedTo: z.string().optional().nullable(),
})

/**
 * Update a transaction
 */
export const PATCH = createRouteHandler<Transaction>()({ auth: true, paramsSchema, bodySchema }, async ({ params, body }) => {
    const { transactionId } = params
    const { description, amount, currency, categoryId, notes, assignedTo } = body

    const transaction = await updateTransaction(transactionId, {
        description: description ?? undefined,
        amount: amount ?? undefined,
        currency: currency ?? undefined,
        categoryId: categoryId ?? undefined,
        notes: notes ?? undefined,
        assignedTo: assignedTo ?? undefined,
    })

    return NextResponse.json({ data: transaction })
})
