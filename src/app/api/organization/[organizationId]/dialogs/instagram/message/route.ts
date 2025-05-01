import { NextResponse } from 'next/server'
import { z } from 'zod'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { sendTextMessage } from '~/lib/server/instagram/api'
import { getInstagramIntegrationByOrganizationId } from '~/services/integration'

import { baseOrganizationIdSchema } from '../../../schemas'

const bodySchema = z.object({
    recipientId: z.string(),
    message: z.string(),
})

export const POST = createRouteHandler()({ auth: true, paramsSchema: baseOrganizationIdSchema, bodySchema }, async ({ params, body }) => {
    const { organizationId } = params
    const { recipientId, message } = body

    const { instagramIntegration } = await getInstagramIntegrationByOrganizationId(organizationId)
    const accessToken = instagramIntegration?.accessToken ?? ''

    await sendTextMessage(accessToken, { recipientId, message })

    return NextResponse.json({ data: { status: 'ok' } })
})
