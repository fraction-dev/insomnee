import { NextResponse } from 'next/server'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { exchangeCodeForToken } from '~/lib/server/meta/api'

export const GET = createRouteHandler()({ auth: true }, async () => {
    const token = await exchangeCodeForToken(
        'AQACdwyBfyUGtZpmsa3ULB4WMOczK_VfLq7UoOzgHrGBhGd-5ZjDrCbh6yGhBXIjMxtv03O2S_RToeH9mYegl-xXoBF2HWOddefF_WbpQFyMgnmbVk7SyiBCe0NzaHO0h1h4TBwlN3tgCQODtEGi78pVoocGxheDRmnq7W0p9eets-2L28KQtwSKebR3wY4rp7KNkRiOL7gBB2uEm2mFnnG6REGksS1LHGR4nCkM0KufRw',
    )

    return NextResponse.json({ data: token })
})
