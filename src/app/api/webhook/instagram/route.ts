import { NextRequest, NextResponse } from 'next/server'

import { env } from '~/config/env'

export async function POST(request: NextRequest) {
    const body = await request.json()

    const recipientId = body.entry?.[0]?.messaging?.[0]?.recipient?.id
    const senderId = body.entry?.[0]?.messaging?.[0]?.sender?.id
    const message = body.entry?.[0]?.messaging?.[0]?.message?.text

    if (!recipientId || !senderId || !message) {
        return
    }

    // const integration = await getInstagramIntegrationByInstagramBusinessId(recipientId)
    // await tasks.trigger<typeof executeInstagramMessageTask>(TriggerTasks.EXECUTE_INSTAGRAM_MESSAGE, {
    //     integration,
    //     message,
    //     senderId,
    // })

    return NextResponse.json({ message: 'Webhook received successfully' })
}

export async function GET(request: NextRequest) {
    // Get the query parameters
    const { searchParams } = new URL(request.url)

    // Check if this is a verification request
    const mode = searchParams.get('hub.mode')
    const token = searchParams.get('hub.verify_token')
    const challenge = searchParams.get('hub.challenge')

    // If this is a verification request and the token matches
    if (mode === 'subscribe' && token === env.INSTAGRAM_WEBHOOK_SECRET) {
        // Return the challenge string as plain text
        return new NextResponse(challenge, {
            status: 200,
            headers: { 'Content-Type': 'text/plain' },
        })
    }

    // For regular API calls, return your data
    return NextResponse.json({ data: env.INSTAGRAM_WEBHOOK_SECRET })
}
