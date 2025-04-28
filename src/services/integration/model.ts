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
    instagramBusinessId: string | null
    configuration?: OrganizationIntegrationInstagramConfiguration
}

export type OrganizationIntegrationVoiceMessageService = 'ELEVENLABS'
export type OrganizationIntegrationVoiceMessageVoice = 'SARAH' | 'ALEX' | 'DOMINIQUE' | 'EMMA' | 'SOPHIA' | 'LUCIA'

export type OrganizationIntegrationInstagramConfiguration = {
    isBotEnabled: boolean
    isVoiceMessageResponseEnabled: boolean
    replyDelay: number
    voiceMessageService: OrganizationIntegrationVoiceMessageService
    voiceMessageVoice: OrganizationIntegrationVoiceMessageVoice
}
