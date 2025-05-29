import { NextResponse } from 'next/server'
import { z } from 'zod'

import { Params } from '~/app/api/organization/[organizationId]/schemas'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { updateOrganizationSettingsMessagingAgent } from '~/services/settings'

const paramsSchema = Params.merge(
    z.object({
        agentId: z.string(),
    }),
)

const bodySchema = z.object({
    prompt: z.string().optional(),
    hasAccessToProductsAndServices: z.boolean().optional(),
})

export const PUT = createRouteHandler()({ auth: true, paramsSchema, bodySchema }, async ({ params, body }) => {
    const { organizationId, agentId } = params
    const { prompt, hasAccessToProductsAndServices } = body

    await updateOrganizationSettingsMessagingAgent(organizationId, agentId, { prompt, hasAccessToProductsAndServices })

    return NextResponse.json({}, { status: 200 })
})
