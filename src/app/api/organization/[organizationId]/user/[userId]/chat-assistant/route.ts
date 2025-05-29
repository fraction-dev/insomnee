import { NextResponse } from 'next/server'
import { z } from 'zod'

import { Params } from '~/app/api/organization/[organizationId]/schemas'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { streamRagChatbot } from '~/lib/server/ai/lib/stream-rag-chatbot'
import { getUserChats } from '~/services/user-chat'
import { UserChat } from '~/services/user-chat/model'
import { BaseResponse } from '~/types/response'

export const paramsSchema = Params.merge(
    z.object({
        userId: z.string(),
    }),
)

const bodySchema = z.object({
    chatId: z.string(),
    messages: z.array(
        z.object({
            role: z.enum(['user', 'assistant', 'system']),
            content: z.string(),
        }),
    ),
})

export type ChatResponse = BaseResponse<{
    stream: ReadableStream
}>

export const POST = createRouteHandler<ChatResponse>()({ auth: true, paramsSchema, bodySchema }, async ({ params, body }) => {
    const { chatId, messages } = body
    const { organizationId, userId } = params

    const result = streamRagChatbot({
        organizationId,
        messages,
        chatId,
        userId,
    })

    return result.toDataStreamResponse({})
})

export const GET = createRouteHandler<UserChat[]>()({ auth: true, paramsSchema }, async ({ params }) => {
    const { userId } = params

    const result = await getUserChats(userId)

    return NextResponse.json({ data: result })
})
