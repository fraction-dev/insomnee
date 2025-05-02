import { NextResponse } from 'next/server'

import { baseOrganizationIdSchema } from '~/app/api/organization/[organizationId]/schemas'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { getOrganizationSettingsAgents } from '~/services/settings'
import { SettingsAgentsOutput } from '~/services/settings/model'

export const GET = createRouteHandler<SettingsAgentsOutput>()(
    { auth: true, paramsSchema: baseOrganizationIdSchema },
    async ({ params }) => {
        const { organizationId } = params

        const settings = await getOrganizationSettingsAgents(organizationId)

        return NextResponse.json({ data: settings })
    },
)
