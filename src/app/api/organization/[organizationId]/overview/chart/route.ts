import { NextResponse } from 'next/server'
import { z } from 'zod'
import { baseOrganizationIdSchema } from '~/app/api/organization/[organizationId]/schemas'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { getOrganizationOverviewChatData } from '~/services/overview'

const querySchema = z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    currency: z.string().optional(),
    chartType: z.enum(['expenses-over-revenue', 'messaging-agent-statistics']),
})

export const GET = createRouteHandler()({ paramsSchema: baseOrganizationIdSchema, querySchema }, async ({ params, query }) => {
    const organizationId = params.organizationId
    const { startDate, endDate, currency, chartType } = query

    const chartData = await getOrganizationOverviewChatData(organizationId, { startDate, endDate, currency, chartType })
    return NextResponse.json({ data: chartData })
})
