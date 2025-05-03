import { OrganizationIntegration } from '../integration/model'

export type OrganizationMessagingAgentStatus = 'PENDING' | 'ACTIVE' | 'ERROR'

export interface OrganizationMessagingAgent {
    id: string
    organizationId: string
    status: OrganizationMessagingAgentStatus
    prompt: string
    integration: OrganizationIntegration | null
    hasAccessToProductsAndServices: boolean
    createdAt: Date
    updatedAt: Date
}

export type UpdateOrganizationMessagingAgentPayload = {
    status?: OrganizationMessagingAgentStatus
    prompt?: string
    hasAccessToProductsAndServices?: boolean
}
