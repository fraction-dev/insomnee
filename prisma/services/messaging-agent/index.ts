import {
    AgentStatus as PrismaAgentStatus,
    IntegrationVoiceMessageService as PrismaIntegrationVoiceMessageService,
    MessagingAgent as PrismaMessagingAgent,
    VoiceMessageService as PrismaVoiceMessageService,
} from '@prisma/client'
import { prisma } from 'prisma/db'

import { OrganizationMessagingAgentNotFoundError } from '~/services/messaging-agent/errors'
import { MessagingAgent, MessagingAgentStatus, UpdateMessagingAgentPayload } from '~/services/messaging-agent/model'

type PrismaOrganizationMessagingAgentWithRelations = PrismaMessagingAgent & {
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
            voiceMessageService: PrismaIntegrationVoiceMessageService
            voiceMessageVoice: PrismaVoiceMessageService
        } | null
    } | null
}

const INCLUDE_CLAUSE = {
    integration: {
        include: { instagramIntegration: true },
    },
}

export const bootstrapOrganizationMessagingAgent = async (organizationId: string, integrationId: string) => {
    const existing = await prisma.messagingAgent.findFirst({
        where: {
            organizationId,
        },
    })

    if (existing) {
        return await updateOrganizationMessagingAgent(existing.id, organizationId, {
            status: 'PENDING',
        })
    }

    const agent = await prisma.messagingAgent.create({
        data: {
            organizationId,
            status: 'PENDING',
            integrationId,
        },
        include: INCLUDE_CLAUSE,
    })

    return mapPrismaOrganizationMessagingAgentToOrganizationMessagingAgent(agent)
}

export const updateOrganizationMessagingAgent = async (id: string, organizationId: string, data: UpdateMessagingAgentPayload) => {
    const updated = await prisma.messagingAgent.update({
        where: { id, organizationId },
        data: {
            status: data.status as PrismaAgentStatus,
            prompt: data.prompt,
            hasAccessToProductsAndServices: data.hasAccessToProductsAndServices,
        },
        include: INCLUDE_CLAUSE,
    })

    return mapPrismaOrganizationMessagingAgentToOrganizationMessagingAgent(updated)
}

export const getOrganizationMessagingAgentByIntegrationId = async (integrationId: string) => {
    const agent = await prisma.messagingAgent.findFirst({
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

export const saveMessagingAgentResponseMessage = async (organizationId: string, messageId: string | number, response: string) => {
    await prisma.messagingAgentResponseMessages.create({
        data: {
            organizationId,
            messageId: String(messageId),
            response,
        },
    })
}

export const getOrganizationMessagingAgentResponsesCount = async (organizationId: string, startDate?: Date, endDate?: Date) => {
    const count = await prisma.messagingAgentResponseMessages.count({
        where: {
            organizationId,
            createdAt: {
                gte: startDate ?? undefined,
                lte: endDate ?? undefined,
            },
        },
    })

    return count
}

export const getOrganizationMessagingAgentResponses = async (organizationId: string, startDate?: Date, endDate?: Date) => {
    const responses = await prisma.messagingAgentResponseMessages.findMany({
        where: {
            organizationId,
            createdAt: {
                gte: startDate ?? undefined,
                lte: endDate ?? undefined,
            },
        },
    })

    return responses
}

export const getOrganizationMessagingAgent = async (organizationId: string) => {
    const agent = await prisma.messagingAgent.findFirst({
        where: {
            organizationId,
        },
        include: INCLUDE_CLAUSE,
    })

    if (!agent) {
        throw OrganizationMessagingAgentNotFoundError(organizationId)
    }

    return mapPrismaOrganizationMessagingAgentToOrganizationMessagingAgent(agent)
}

const mapPrismaOrganizationMessagingAgentToOrganizationMessagingAgent = (
    agent: PrismaOrganizationMessagingAgentWithRelations,
): MessagingAgent => {
    return {
        id: agent.id,
        organizationId: agent.organizationId,
        status: agent.status as MessagingAgentStatus,
        prompt: agent.prompt ?? '',
        createdAt: agent.createdAt,
        updatedAt: agent.updatedAt,
        hasAccessToProductsAndServices: agent.hasAccessToProductsAndServices,
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
