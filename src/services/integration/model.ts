export type IntegrationType = 'INSTAGRAM' | 'FACEBOOK' | 'WHATSAPP' | 'TWITTER' | 'TELEGRAM' | 'SIMPALS'

export interface Integration {
    id: string
    type: IntegrationType
    organizationId: string
    credentials: IntegrationCredentials
    createdAt: Date
    updatedAt: Date
}

type IntegrationCredentials = InstagramIntegrationCredentials

type InstagramIntegrationCredentials = {
    code: string
}
