import { Integration } from '../integration/model'

export type MessagingAgentStatus = 'PENDING' | 'ACTIVE' | 'ERROR'

export interface MessagingAgent {
    id: string
    organizationId: string
    status: MessagingAgentStatus
    prompt: string
    integration: Integration | null
    hasAccessToProductsAndServices: boolean
    createdAt: Date
    updatedAt: Date
}

export type UpdateMessagingAgentPayload = {
    status?: MessagingAgentStatus
    prompt?: string
    hasAccessToProductsAndServices?: boolean
}
