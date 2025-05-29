import { NextResponse } from 'next/server'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { getOrganizationMembers } from '~/services/organization'

import { Params } from '../schemas'

export const GET = createRouteHandler()({ auth: true, paramsSchema: Params }, async ({ params }) => {
    const { organizationId } = params

    const organizationMembers = await getOrganizationMembers(organizationId)

    return NextResponse.json({ data: organizationMembers })
})
