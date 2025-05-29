import { NextResponse } from 'next/server'
import { z } from 'zod'

import { Params } from '~/app/api/organization/[organizationId]/schemas'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { updateInstagramIntegrationConfiguration } from '~/services/integration'
import { IntegrationVoiceMessageService, IntegrationVoiceMessageVoice } from '~/services/integration/model'

const paramsSchema = Params.merge(
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
        voiceMessageService: voiceMessageService as IntegrationVoiceMessageService,
        voiceMessageVoice: voiceMessageVoice as IntegrationVoiceMessageVoice,
    })

    return NextResponse.json({ data: integration })
})
