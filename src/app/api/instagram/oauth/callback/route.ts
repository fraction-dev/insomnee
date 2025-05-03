import { tasks } from '@trigger.dev/sdk/v3'
import { NextResponse } from 'next/server'

import { env } from '~/config/env'
import logger from '~/core/logger'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { getLongLivedAccessToken, getMe, getShortLivedAccessToken } from '~/lib/server/instagram/api'
import { extractBusinessIdFromConversations } from '~/lib/server/instagram/lib/extractBusinessIdFromConversations'
import { getInstagramConversations } from '~/services/instagram'
import { addInstagramIntegration, updateInstagramIntegration } from '~/services/integration'
import { getOrganizationById } from '~/services/organization'
import { setupMessagingAgentTask } from '~/trigger/agents/messaging-agents'
import { TriggerTasks } from '~/trigger/types/tasks'

export const GET = createRouteHandler()({ auth: false }, async ({ req: request }) => {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (state && code && 'organizationId' in JSON.parse(state)) {
        const organizationId = JSON.parse(state).organizationId
        const organization = await getOrganizationById(organizationId)

        const shortLivedAccessToken = await getShortLivedAccessToken(code)
        logger.info(`Got short lived access token`, { organizationId, shortLivedAccessToken })

        const longLivedAccessToken = await getLongLivedAccessToken(shortLivedAccessToken.access_token, env.INSTAGRAM_APP_SECRET)
        logger.info(`Got long lived access token`, { organizationId, longLivedAccessToken })

        const me = await getMe(longLivedAccessToken.access_token, shortLivedAccessToken.user_id)
        logger.info(`Got me`, { organizationId, me })

        const integration = await addInstagramIntegration(organizationId, {
            accessToken: longLivedAccessToken.access_token,
            tokenType: longLivedAccessToken.token_type,
            expiresIn: longLivedAccessToken.expires_in,
            instagramUserId: shortLivedAccessToken.user_id,
            instagramBusinessId: null,
        })

        const conversations = await getInstagramConversations(organizationId)
        const businessId = extractBusinessIdFromConversations(me.username ?? '', conversations)

        await updateInstagramIntegration(integration.id, {
            instagramBusinessId: businessId,
        })

        await tasks.trigger<typeof setupMessagingAgentTask>(TriggerTasks.SETUP_MESSAGING_AGENT, {
            organizationId,
            integrationId: integration.id,
            socialType: 'INSTAGRAM',
            websiteUrl: organization.websiteUrl ?? '',
            dialogs: conversations,
        })
    }

    if (!code) {
        return NextResponse.json({ data: null, error: 'No code provided' }, { status: 400 })
    }

    return NextResponse.json({ data: null, error: null }, { status: 302, headers: { Location: env.BASE_URL } })
})
