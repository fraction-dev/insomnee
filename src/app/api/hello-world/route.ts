// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from 'next/server'

//tasks.trigger also works with the edge runtime
//export const runtime = "edge";

export async function GET() {
    // const handle = await tasks.trigger<typeof setupMessagingAgentTask>('setup-messaging-agent', {
    //     organizationId: 'cm9opbfgw000hh37gzr6y71ys',
    //     websiteUrl: 'https://fraction.dev/',
    //     socialType: 'INSTAGRAM',
    //     dialogs: DUMMY_DIALOGS,
    // })

    return NextResponse.json({})
}
