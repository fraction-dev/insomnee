import { AgentsView } from '~/views/agents.view'

export default async function Page({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params

    return <AgentsView organizationId={organizationId} />
}
