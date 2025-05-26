import * as OrganizationMessagingDB from 'prisma/services/messaging-agent'

import { MessagingAgent } from './model'

export const bootstrapOrganizationMessagingAgent = async (organizationId: string, integrationId: string) => {
    return OrganizationMessagingDB.bootstrapOrganizationMessagingAgent(organizationId, integrationId)
}

export const updateOrganizationMessagingAgent = async (id: string, organizationId: string, data: Partial<MessagingAgent>) => {
    return OrganizationMessagingDB.updateOrganizationMessagingAgent(id, organizationId, data)
}

export const getOrganizationMessagingAgentByIntegrationId = async (integrationId: string) => {
    return OrganizationMessagingDB.getOrganizationMessagingAgentByIntegrationId(integrationId)
}

export const saveMessagingAgentResponseMessage = async (organizationId: string, messageId: string | number, response: string) => {
    return OrganizationMessagingDB.saveMessagingAgentResponseMessage(organizationId, messageId, response)
}

export const getOrganizationMessagingAgentResponsesCount = async (organizationId: string, startDate?: Date, endDate?: Date) => {
    return OrganizationMessagingDB.getOrganizationMessagingAgentResponsesCount(organizationId, startDate, endDate)
}

export const getOrganizationMessagingAgentResponses = async (organizationId: string, startDate?: Date, endDate?: Date) => {
    return OrganizationMessagingDB.getOrganizationMessagingAgentResponses(organizationId, startDate, endDate)
}

export const getOrganizationMessagingAgent = async (organizationId: string) => {
    return OrganizationMessagingDB.getOrganizationMessagingAgent(organizationId)
}
