import * as OrganizationMessagingDB from 'prisma/services/organization-messaging-agent'
import { OrganizationMessagingAgent } from './model'

export const bootstrapOrganizationMessagingAgent = async (organizationId: string, integrationId: string) => {
    return OrganizationMessagingDB.bootstrapOrganizationMessagingAgent(organizationId, integrationId)
}

export const updateOrganizationMessagingAgent = async (id: string, data: Partial<OrganizationMessagingAgent>) => {
    return OrganizationMessagingDB.updateOrganizationMessagingAgent(id, data)
}

export const getOrganizationMessagingAgentByIntegrationId = async (integrationId: string) => {
    return OrganizationMessagingDB.getOrganizationMessagingAgentByIntegrationId(integrationId)
}

export const saveMessagingAgentResponseMessage = async (organizationId: string, messageId: string | number, response: string) => {
    return OrganizationMessagingDB.saveMessagingAgentResponseMessage(organizationId, messageId, response)
}
