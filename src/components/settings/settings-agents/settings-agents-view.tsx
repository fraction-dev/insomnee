'use client'

import { isNil } from 'lodash'

import { useSettingsAgents } from '~/hooks/settings/useSettingsAgents'
import { SettingsAgentsOutput } from '~/services/settings/model'

import { MessagingAgentView } from './messaging-agent/messaging-agent-view'

interface Props {
    organizationId: string
}

export const SettingsAgentsView = ({ organizationId }: Props) => {
    const { data } = useSettingsAgents(organizationId)

    const isAgentInData = (agent: keyof SettingsAgentsOutput) => {
        if (!data?.data || isNil(data.data[agent])) return false
        return agent in data.data
    }

    const messagingAgent = isAgentInData('messagingAgent') ? data?.data.messagingAgent : null

    return (
        <div className="flex flex-col gap-6">
            {messagingAgent && <MessagingAgentView organizationId={organizationId} agent={messagingAgent} />}
        </div>
    )
}
