import { getOrganizationMessagingAgent, updateOrganizationMessagingAgent } from '../organization-messaging-agent'
import { UpdateOrganizationMessagingAgentPayload } from '../organization-messaging-agent/model'
import { SettingsAgentsOutput } from './model'

export const getOrganizationSettingsAgents = async (organizationId: string): Promise<SettingsAgentsOutput> => {
    const [messagingAgent] = await Promise.all([getOrganizationMessagingAgent(organizationId)])

    return {
        messagingAgent,
    }
}

export const updateOrganizationSettingsMessagingAgent = async (
    organizationId: string,
    agentId: string,
    settings: UpdateOrganizationMessagingAgentPayload,
) => {
    return updateOrganizationMessagingAgent(organizationId, agentId, settings)
}
