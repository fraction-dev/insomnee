import { NextResponse } from 'next/server'

import { createRouteHandler } from '~/core/middleware/with-route-handler'

export const GET = createRouteHandler()({ auth: false }, async ({ req: request }) => {
    // Get the query parameters
    const { searchParams } = new URL(request.url)

    // Check if this is a verification request
    const mode = searchParams.get('hub.mode')
    const token = searchParams.get('hub.verify_token')
    const challenge = searchParams.get('hub.challenge')

    // If this is a verification request and the token matches
    if (mode === 'subscribe' && token === 'eSAc3Gpn3v') {
        // Return the challenge string as plain text
        return new NextResponse(challenge, {
            status: 200,
            headers: { 'Content-Type': 'text/plain' },
        })
    }

    // For regular API calls, return your data
    return NextResponse.json({ data: 'eSAc3Gpn3v' })
})
