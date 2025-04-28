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
    createdAt: Date
    updatedAt: Date
}
