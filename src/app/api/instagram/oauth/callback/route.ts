import { NextResponse } from 'next/server'

import { env } from '~/config/env'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { getAccessTokenByCode } from '~/lib/server/instagram/api'
import { addInstagramIntegration } from '~/services/integration'

export const GET = createRouteHandler()({ auth: true }, async ({ req: request }) => {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (state && code && 'organizationId' in JSON.parse(state)) {
        const organizationId = JSON.parse(state).organizationId
        const accessToken = await getAccessTokenByCode(code)

        await addInstagramIntegration(organizationId, {
            code,
            accessToken: accessToken.access_token,
            userId: accessToken.user_id,
        })
    }

    if (!code) {
        return NextResponse.json({ data: null, error: 'No code provided' }, { status: 400 })
    }

    return NextResponse.json({ data: null, error: null }, { status: 302, headers: { Location: env.BASE_URL } })
})
