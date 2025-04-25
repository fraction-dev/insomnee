import { NextResponse } from 'next/server'

import { env } from '~/config/env'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { getLongLivedAccessToken, getShortLivedAccessToken } from '~/lib/server/instagram/api'
import { addInstagramIntegration } from '~/services/integration'

export const GET = createRouteHandler()({ auth: true }, async ({ req: request }) => {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (state && code && 'organizationId' in JSON.parse(state)) {
        const organizationId = JSON.parse(state).organizationId

        const shortLivedAccessToken = await getShortLivedAccessToken(code)
        const longLivedAccessToken = await getLongLivedAccessToken(shortLivedAccessToken.access_token, env.INSTAGRAM_APP_SECRET)

        console.log({
            shortLivedAccessToken,
            longLivedAccessToken,
        })

        await addInstagramIntegration(organizationId, {
            accessToken: longLivedAccessToken.access_token,
            tokenType: longLivedAccessToken.token_type,
            expiresIn: longLivedAccessToken.expires_in,
            instagramUserId: shortLivedAccessToken.user_id,
        })
    }

    if (!code) {
        return NextResponse.json({ data: null, error: 'No code provided' }, { status: 400 })
    }

    return NextResponse.json({ data: null, error: null }, { status: 302, headers: { Location: env.BASE_URL } })
})
