import { NextResponse } from 'next/server'

import { Params } from '~/app/api/organization/[organizationId]/schemas'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { createConfiguration, getCompanyConfigurations } from '~/services/leads-generation'
import { LeadsGenerationAgentConfiguration, LeadsGenerationAgentOnboardingDirtyFormSchema } from '~/services/leads-generation/model'
import { BaseResponse } from '~/types/response'

export const POST = createRouteHandler<BaseResponse<LeadsGenerationAgentConfiguration>>()(
    { auth: true, bodySchema: LeadsGenerationAgentOnboardingDirtyFormSchema, paramsSchema: Params },
    async ({ body, params }) => {
        const { organizationId } = params

        const onboardingData = await createConfiguration(organizationId, body)
        return NextResponse.json({ data: onboardingData }, { status: 201 })
    },
)

export const GET = createRouteHandler<BaseResponse<LeadsGenerationAgentConfiguration[]>>()(
    { auth: true, paramsSchema: Params },
    async ({ params }) => {
        const { organizationId } = params
        const configurations = await getCompanyConfigurations(organizationId)
        return NextResponse.json({ data: configurations })
    },
)
