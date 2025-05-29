import { NextResponse } from 'next/server'
import { z } from 'zod'

import { Params } from '~/app/api/organization/[organizationId]/schemas'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { getOrganizationIntegrationById } from '~/services/integration'

const paramsSchema = Params.merge(
    z.object({
        integrationId: z.string(),
    }),
)

export const GET = createRouteHandler()({ auth: true, paramsSchema }, async ({ params }) => {
    const { organizationId, integrationId } = params

    const integration = await getOrganizationIntegrationById(organizationId, integrationId)

    return NextResponse.json({ data: integration })
})
