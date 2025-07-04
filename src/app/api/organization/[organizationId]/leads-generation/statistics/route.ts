import { NextResponse } from 'next/server'

import { Params } from '~/app/api/organization/[organizationId]/schemas'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { getOrganizationLeadGenerationStatistics } from '~/services/leads-generation'
import { LeadsGenerationAgentStatistics } from '~/services/leads-generation/model'
import { BaseResponse } from '~/types/response'

export const GET = createRouteHandler<BaseResponse<LeadsGenerationAgentStatistics>>()(
    { auth: true, paramsSchema: Params },
    async ({ params }) => {
        const { organizationId } = params

        const statistics = await getOrganizationLeadGenerationStatistics(organizationId)
        return NextResponse.json({ data: statistics })
    },
)
