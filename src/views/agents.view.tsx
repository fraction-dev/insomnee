'use client'

import { AgentsTabs } from '~/components/agents/agents-tabs'

export const AgentsView = ({ organizationId }: { organizationId: string }) => {
    return (
        <div className="flex flex-col gap-4">
            <AgentsTabs organizationId={organizationId} />
        </div>
    )
}
