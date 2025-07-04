import { NextResponse } from 'next/server'
import { z } from 'zod'

import { Params } from '~/app/api/organization/[organizationId]/schemas'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { LeadsGenerationAgentOnboardingFormSchemaType } from '~/services/leads-generation/model'
import { BaseResponse } from '~/types/response'

const bodySchema = z.object({
    websiteUrl: z.string().url(),
})

export const POST = createRouteHandler<
    BaseResponse<{
        data: LeadsGenerationAgentOnboardingFormSchemaType
    }>
>()({ auth: true, bodySchema, paramsSchema: Params }, async ({ body }) => {
    const { websiteUrl } = body

    return NextResponse.json({
        data: {
            websiteUrl,
        },
    })
})
