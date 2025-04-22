import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { updateOrganizationLogo } from '~/services/organization'
import { baseOrganizationIdSchema } from '../schemas'

const bodySchema = z.object({
    logo: z.string(),
})

export const PUT = createRouteHandler()({ auth: true, bodySchema, paramsSchema: baseOrganizationIdSchema }, async ({ body, params }) => {
    await updateOrganizationLogo(params.organizationId, body.logo)

    return NextResponse.json({ data: null })
})
