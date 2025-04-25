import { NextResponse } from 'next/server'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { getOrganizationIntegrations } from '~/services/integration'
import { baseOrganizationIdSchema } from '../schemas'

export const GET = createRouteHandler()({ auth: true, paramsSchema: baseOrganizationIdSchema }, async ({ params }) => {
    const integrations = await getOrganizationIntegrations(params.organizationId)

    return NextResponse.json({ data: integrations })
})
