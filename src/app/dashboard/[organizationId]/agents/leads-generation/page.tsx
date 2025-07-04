import { LeadsGenerationAgentView } from '~/views/leads-generation-agent.view'

export default async function Page({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params

    return <LeadsGenerationAgentView organizationId={organizationId} />
}
