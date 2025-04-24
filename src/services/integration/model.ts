export type OrganizationIntegrationType = 'INSTAGRAM' | 'FACEBOOK' | 'WHATSAPP' | 'TWITTER' | 'TELEGRAM' | 'SIMPALS'

export interface OrganizationIntegration {
    id: string
    type: OrganizationIntegrationType
    organizationId: string
    instagramIntegration: OrganizationIntegrationInstagramPayload | null
    createdAt: Date
    updatedAt: Date
}

export type OrganizationIntegrationInstagramPayload = {
    accessToken: string
    tokenType: string
    expiresIn: number
    instagramUserId: string
}
