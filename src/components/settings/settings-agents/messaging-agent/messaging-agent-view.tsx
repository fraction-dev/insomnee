import { toLower, upperFirst } from 'lodash'

import { SettingsCard } from '~/components/settings/settings-card'
import { MessagingAgent } from '~/services/messaging-agent/model'

import { MessagingAgentForm } from './messaging-agent-form'

interface Props {
    organizationId: string
    agent: MessagingAgent
}

export const MessagingAgentView = ({ organizationId, agent }: Props) => {
    return (
        <SettingsCard
            type={agent.integration?.type}
            isLoading={agent.status === 'PENDING'}
            title={`${upperFirst(toLower(agent.integration?.type))} messaging agent configuration`}
            description={`Customize the rules for your ${toLower(agent.integration?.type)} messaging agent, to make it more powerful in responses, reactions, emojis and listenings. Customize it based on your needs`}
        >
            <MessagingAgentForm organizationId={organizationId} agent={agent} />
        </SettingsCard>
    )
}
