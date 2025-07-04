import { NextResponse } from 'next/server'
import { z } from 'zod'

import { Params } from '~/app/api/organization/[organizationId]/schemas'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { createLeadsGenerationAgentThread, createLeadsGenerationAgentThreadRun } from '~/lib/server/agents/leads-generation/api'
import {
    createLeadGenerationRun,
    getConfigurationRun,
    getOrganizationConfigurationById,
    updateConfigurationRunStatus,
} from '~/services/leads-generation'
import { LeadsGenerationAgentRun } from '~/services/leads-generation/model'
import { BaseResponse } from '~/types/response'

const paramsSchema = Params.merge(z.object({ configurationId: z.string() }))

const bodySchema = z.object({
    status: z.enum(['PENDING', 'PAUSED']).optional(),
})

/**
 * Run a lead generation agent for a given configuration
 */
export const POST = createRouteHandler<BaseResponse<LeadsGenerationAgentRun>>()({ paramsSchema, bodySchema }, async ({ params, body }) => {
    const { organizationId, configurationId } = params
    const { status } = body

    const configuration = await getOrganizationConfigurationById(organizationId, configurationId)
    const run = await getConfigurationRun(configurationId)
    if (!run) {
        const thread = await createLeadsGenerationAgentThread()
        const run = await createLeadsGenerationAgentThreadRun(thread.thread_id, {
            assistant_id: 'agent',
            input: {
                input: {
                    companyName: configuration.companyName,
                    solution: configuration.solution,
                    decisionMakers: configuration.decisionMakers,
                    newsFramework: configuration.newsFramework,
                    icpCompanySizeRange: configuration.icpCompanySizeRange,
                    icpIndustryVertical: configuration.icpIndustryVertical,
                    icpAnnualRevenue: configuration.icpAnnualRevenue,
                    icpHqLocation: configuration.icpHqLocation,
                    icpPhysicalPresence: configuration.icpPhysicalPresence,
                },
            },
        })

        const leadGenerationAgent = await createLeadGenerationRun(organizationId, configurationId, run)
        return NextResponse.json({ data: leadGenerationAgent }, { status: 201 })
    }

    if (!status) {
        return NextResponse.json({ data: run }, { status: 200 })
    }

    await updateConfigurationRunStatus(run.id, status)

    return NextResponse.json({ data: run }, { status: 200 })
})
