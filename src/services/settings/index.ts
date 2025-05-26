import { getOrganizationMessagingAgent, updateOrganizationMessagingAgent } from '../messaging-agent'
import { UpdateMessagingAgentPayload } from '../messaging-agent/model'
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
    settings: UpdateMessagingAgentPayload,
) => {
    return updateOrganizationMessagingAgent(organizationId, agentId, settings)
}
