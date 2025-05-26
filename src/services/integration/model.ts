export type IntegrationType = 'INSTAGRAM' | 'FACEBOOK' | 'WHATSAPP' | 'TWITTER' | 'TELEGRAM' | 'SIMPALS'

export interface Integration {
    id: string
    type: IntegrationType
    organizationId: string
    instagramIntegration: IntegrationInstagramPayload | null
    createdAt: Date
    updatedAt: Date
}

export type IntegrationInstagramPayload = {
    accessToken: string
    tokenType: string
    expiresIn: number
    instagramUserId: string
    instagramBusinessId: string | null
    configuration?: IntegrationInstagramConfiguration
}

export type IntegrationVoiceMessageService = 'ELEVENLABS'
export type IntegrationVoiceMessageVoice = 'SARAH' | 'ALEX' | 'DOMINIQUE' | 'EMMA' | 'SOPHIA' | 'LUCIA'

export type IntegrationInstagramConfiguration = {
    isBotEnabled: boolean
    isVoiceMessageResponseEnabled: boolean
    replyDelay: number
    voiceMessageService: IntegrationVoiceMessageService
    voiceMessageVoice: IntegrationVoiceMessageVoice
}
