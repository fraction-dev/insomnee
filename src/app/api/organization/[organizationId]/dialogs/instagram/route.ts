import { NextResponse } from 'next/server'

import { Params } from '~/app/api/organization/[organizationId]/schemas'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { getInstagramConversations } from '~/services/instagram'
import { Dialog } from '~/services/messaging/model'

export const GET = createRouteHandler<Dialog[]>()({ auth: true, paramsSchema: Params }, async ({ params }) => {
    const conversations = await getInstagramConversations(params.organizationId)

    return NextResponse.json({ data: conversations })
})
