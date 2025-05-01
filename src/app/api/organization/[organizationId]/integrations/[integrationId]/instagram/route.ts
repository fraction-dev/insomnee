import { NextResponse } from 'next/server'
import { z } from 'zod'

import { baseOrganizationIdSchema } from '~/app/api/organization/[organizationId]/schemas'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { updateInstagramIntegrationConfiguration } from '~/services/integration'
import { OrganizationIntegrationVoiceMessageService, OrganizationIntegrationVoiceMessageVoice } from '~/services/integration/model'

const paramsSchema = baseOrganizationIdSchema.merge(
    z.object({
        integrationId: z.string(),
    }),
)

const bodySchema = z.object({
    isBotEnabled: z.boolean().optional(),
    isVoiceMessageResponseEnabled: z.boolean().optional(),
    replyDelay: z.number().optional(),
    voiceMessageService: z.string().optional(),
    voiceMessageVoice: z.string().optional(),
})

/**
 * Update Instagram integration configuration
 */
export const PUT = createRouteHandler()({ auth: true, paramsSchema, bodySchema }, async ({ params, body }) => {
    const { integrationId } = params
    const { isBotEnabled, isVoiceMessageResponseEnabled, replyDelay, voiceMessageService, voiceMessageVoice } = body

    const integration = await updateInstagramIntegrationConfiguration(integrationId, {
        isBotEnabled,
        isVoiceMessageResponseEnabled,
        replyDelay,
        voiceMessageService: voiceMessageService as OrganizationIntegrationVoiceMessageService,
        voiceMessageVoice: voiceMessageVoice as OrganizationIntegrationVoiceMessageVoice,
    })

    return NextResponse.json({ data: integration })
})
