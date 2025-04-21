import { NextResponse } from 'next/server'
import { z } from 'zod'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { getOrganizationById } from '~/services/organization'
import { Organization } from '~/services/organization/model'

const paramsSchema = z.object({
    organizationId: z.string(),
})

export const GET = createRouteHandler<Organization>()({ auth: true, paramsSchema }, async ({ params }) => {
    const organization = await getOrganizationById(params.organizationId)

    return NextResponse.json({ data: organization })
})
