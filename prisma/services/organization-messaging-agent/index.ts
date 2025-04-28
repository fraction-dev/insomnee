import {
    OrganizationAgentStatus,
    OrganizationIntegrationVoiceMessageService,
    OrganizationIntegrationVoiceMessageVoice,
    OrganizationMessagingAgent as PrismaOrganizationMessagingAgent,
} from '@prisma/client'
import { prisma } from 'prisma/db'
import { OrganizationMessagingAgentNotFoundError } from '~/services/organization-messaging-agent/errors'
import { OrganizationMessagingAgent, OrganizationMessagingAgentStatus } from '~/services/organization-messaging-agent/model'

type PrismaOrganizationMessagingAgentWithRelations = PrismaOrganizationMessagingAgent & {
    integration: {
        id: string
        type: string
        organizationId: string
        createdAt: Date
        updatedAt: Date
        instagramIntegration: {
            id: string
            accessToken: string
            instagramUserId: string
            tokenType: string
            expiresIn: number
            instagramBusinessId: string | null
            isBotEnabled: boolean
            isVoiceMessageResponseEnabled: boolean
            replyDelay: number
            voiceMessageService: OrganizationIntegrationVoiceMessageService
            voiceMessageVoice: OrganizationIntegrationVoiceMessageVoice
        } | null
    } | null
}

const INCLUDE_CLAUSE = {
    integration: {
        include: { instagramIntegration: true },
    },
}

export const bootstrapOrganizationMessagingAgent = async (organizationId: string, integrationId: string) => {
    const existing = await prisma.organizationMessagingAgent.findFirst({
        where: {
            organizationId,
        },
    })

    if (existing) {
        return await updateOrganizationMessagingAgent(existing.id, {
            status: OrganizationMessagingAgentStatus.PENDING,
        })
    }

    const agent = await prisma.organizationMessagingAgent.create({
        data: {
            organizationId,
            status: OrganizationMessagingAgentStatus.PENDING,
            integrationId,
        },
        include: INCLUDE_CLAUSE,
    })

    return mapPrismaOrganizationMessagingAgentToOrganizationMessagingAgent(agent)
}

export const updateOrganizationMessagingAgent = async (id: string, data: Partial<OrganizationMessagingAgent>) => {
    const updated = await prisma.organizationMessagingAgent.update({
        where: { id },
        data: {
            status: data.status as OrganizationAgentStatus,
            prompt: data.prompt,
        },
        include: INCLUDE_CLAUSE,
    })

    return mapPrismaOrganizationMessagingAgentToOrganizationMessagingAgent(updated)
}

export const getOrganizationMessagingAgentByIntegrationId = async (integrationId: string) => {
    const agent = await prisma.organizationMessagingAgent.findFirst({
        where: {
            integrationId,
        },
        include: INCLUDE_CLAUSE,
    })

    if (!agent) {
        throw OrganizationMessagingAgentNotFoundError(integrationId)
    }

    return mapPrismaOrganizationMessagingAgentToOrganizationMessagingAgent(agent)
}

const mapPrismaOrganizationMessagingAgentToOrganizationMessagingAgent = (
    agent: PrismaOrganizationMessagingAgentWithRelations,
): OrganizationMessagingAgent => {
    return {
        id: agent.id,
        organizationId: agent.organizationId,
        status: agent.status as OrganizationMessagingAgentStatus,
        prompt: agent.prompt ?? '',
        createdAt: agent.createdAt,
        updatedAt: agent.updatedAt,
        integration: agent.integration
            ? {
                  id: agent.integration.id,
                  type: agent.integration.type as 'INSTAGRAM',
                  organizationId: agent.integration.organizationId,
                  createdAt: agent.integration.createdAt,
                  updatedAt: agent.integration.updatedAt,
                  instagramIntegration: agent.integration.instagramIntegration
                      ? {
                            accessToken: agent.integration.instagramIntegration.accessToken,
                            tokenType: agent.integration.instagramIntegration.tokenType,
                            expiresIn: agent.integration.instagramIntegration.expiresIn,
                            instagramUserId: agent.integration.instagramIntegration.instagramUserId,
                            instagramBusinessId: agent.integration.instagramIntegration.instagramBusinessId,
                            configuration: {
                                isBotEnabled: agent.integration.instagramIntegration.isBotEnabled,
                                isVoiceMessageResponseEnabled: agent.integration.instagramIntegration.isVoiceMessageResponseEnabled,
                                replyDelay: agent.integration.instagramIntegration.replyDelay,
                                voiceMessageService: agent.integration.instagramIntegration.voiceMessageService,
                                voiceMessageVoice: agent.integration.instagramIntegration.voiceMessageVoice,
                            },
                        }
                      : null,
              }
            : null,
    }
}
