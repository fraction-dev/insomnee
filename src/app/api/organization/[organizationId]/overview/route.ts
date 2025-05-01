import { NextResponse } from 'next/server'
import { z } from 'zod'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { getOrganizationOverviewStatistics } from '~/services/overview'

import { baseOrganizationIdSchema } from '../schemas'

const querySchema = z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    currency: z.string().optional(),
})

export const GET = createRouteHandler()({ paramsSchema: baseOrganizationIdSchema, querySchema }, async ({ params, query }) => {
    const organizationId = params.organizationId
    const { startDate, endDate, currency } = query

    const statistics = await getOrganizationOverviewStatistics(organizationId, { startDate, endDate, currency })
    return NextResponse.json({ data: statistics })
})
