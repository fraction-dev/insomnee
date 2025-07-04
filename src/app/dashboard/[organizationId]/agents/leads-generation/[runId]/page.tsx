import { getLeadGenerationRunById } from '~/services/leads-generation'
import { LeadsGenerationAgentRunView } from '~/views/leads-generation-agent-run.view'

export default async function Page({ params }: { params: Promise<{ organizationId: string; runId: string }> }) {
    const { runId } = await params

    const run = await getLeadGenerationRunById(runId)

    return <LeadsGenerationAgentRunView run={run} />
}
