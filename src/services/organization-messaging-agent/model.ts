import { OrganizationIntegration } from '../integration/model'

export enum OrganizationMessagingAgentStatus {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    ERROR = 'ERROR',
}

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
