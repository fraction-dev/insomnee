import { SettingsCard } from '~/components/settings/settings-card'
import { OrganizationMessagingAgent } from '~/services/organization-messaging-agent/model'

import { MessagingAgentForm } from './messaging-agent-form'

interface Props {
    organizationId: string
    agent: OrganizationMessagingAgent
}

export const MessagingAgentView = ({ organizationId, agent }: Props) => {
    return (
        <SettingsCard
            isLoading={agent.status === 'PENDING'}
            title="Messaging Agent configuration"
            description="Customize the rules for your messaging agent, to make it more powerful in responses, reactions, emojis and listenings. Customize it based on your needs."
        >
            <MessagingAgentForm organizationId={organizationId} agent={agent} />
        </SettingsCard>
    )
}
