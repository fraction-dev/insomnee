import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { updateOrganizationName } from '~/services/organization'
import { baseOrganizationIdSchema } from '../schemas'

const bodySchema = z.object({
    name: z.string(),
})

export const PUT = createRouteHandler()({ auth: true, bodySchema, paramsSchema: baseOrganizationIdSchema }, async ({ body, params }) => {
    await updateOrganizationName(params.organizationId, body.name)

    return NextResponse.json({ data: null })
})
