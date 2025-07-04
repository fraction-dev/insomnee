import { NextResponse } from 'next/server'

import { Params } from '~/app/api/organization/[organizationId]/schemas'
import { NotFoundException } from '~/core/exception'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { createLeadsGenerationAgentThread, createLeadsGenerationAgentThreadRun } from '~/lib/server/agents/leads-generation/api'
import { createLeadGenerationRun, getConfigurationByOrganizationId, getOrganizationLeadGenerationRuns } from '~/services/leads-generation'
import { LeadsGenerationAgentRun } from '~/services/leads-generation/model'
import { BaseResponse } from '~/types/response'

export const POST = createRouteHandler<BaseResponse<LeadsGenerationAgentRun>>()(
    { auth: true, paramsSchema: Params },
    async ({ params }) => {
        const { organizationId } = params

        const configuration = await getConfigurationByOrganizationId(organizationId)
        if (!configuration) {
            throw new NotFoundException(`Configuration not found for organization ${organizationId}`)
        }

        const thread = await createLeadsGenerationAgentThread()
        const run = await createLeadsGenerationAgentThreadRun(thread.thread_id, {
            assistant_id: 'agent',
            input: {
                input: {
                    companyName: configuration.companyName,
                    newsFramework: {
                        searchKeywords: configuration.newsFramework.searchKeywords,
                        essentialSignals: configuration.newsFramework.essentialSignals,
                        additionalSignals: configuration.newsFramework.additionalSignals,
                        searchConfig: {
                            countries: configuration.newsFramework.searchConfig.countries.map((country) => country.toLowerCase()),
                        },
                    },
                    solution: configuration.solution,
                    icpCompanySizeRange: configuration.icpCompanySizeRange,
                    icpIndustryVertical: configuration.icpIndustryVertical,
                    icpAnnualRevenue: configuration.icpAnnualRevenue,
                    icpHqLocation: configuration.icpHqLocation,
                    icpPhysicalPresence: configuration.icpPhysicalPresence,
                    decisionMakers: configuration.decisionMakers,
                },
            },
        })

        const leadGenerationAgent = await createLeadGenerationRun(organizationId, configuration.id, run)

        return NextResponse.json({ data: leadGenerationAgent }, { status: 200 })
    },
)

export const GET = createRouteHandler<BaseResponse<LeadsGenerationAgentRun[]>>()(
    { auth: true, paramsSchema: Params },
    async ({ params }) => {
        const { organizationId } = params

        const runs = await getOrganizationLeadGenerationRuns(organizationId)

        return NextResponse.json({ data: runs }, { status: 200 })
    },
)
