import { Integration as PrismaIntegration, IntegrationInstagram as PrismaIntegrationInstagram } from '@prisma/client'
import { prisma } from 'prisma/db'

import {
    InstagramIntegrationNotFoundForInstagramBusinessIdError,
    InstagramIntegrationNotFoundForIntegrationIdError,
} from '~/services/integration/errors'
import { Integration, IntegrationInstagramConfiguration, IntegrationInstagramPayload } from '~/services/integration/model'

type PrismaIntegrationWithRelations = PrismaIntegration & {
    instagramIntegration: PrismaIntegrationInstagram | null
}

export const addInstagramIntegration = async (organizationId: string, payload: Omit<IntegrationInstagramPayload, 'configuration'>) => {
    const instagramIntegration = await prisma.integrationInstagram.create({
        data: {
            accessToken: payload.accessToken,
            tokenType: payload.tokenType,
            expiresIn: payload.expiresIn,
            instagramUserId: `${payload.instagramUserId}`,
        },
    })

    const integration = await prisma.integration.create({
        data: {
            organizationId,
            type: 'INSTAGRAM',
            instagramIntegrationId: instagramIntegration.id,
        },
        include: {
            instagramIntegration: true,
        },
    })

    return mapPrismaIntegrationToInstagramIntegration(integration)
}

export const getOrganizationIntegrations = async (organizationId: string) => {
    const integrations = await prisma.integration.findMany({
        where: {
            organizationId,
        },
        include: {
            instagramIntegration: true,
        },
    })

    return integrations.map(mapPrismaIntegrationToInstagramIntegration)
}

export const getInstagramIntegrationByOrganizationId = async (organizationId: string) => {
    const integration = await prisma.integration.findFirst({
        where: { organizationId, type: 'INSTAGRAM' },
        include: { instagramIntegration: true },
    })

    if (!integration) {
        throw InstagramIntegrationNotFoundForIntegrationIdError(organizationId)
    }

    return mapPrismaIntegrationToInstagramIntegration(integration)
}

export const getInstagramIntegrationByInstagramBusinessId = async (instagramBusinessId: string) => {
    const integration = await prisma.integration.findFirst({
        where: { instagramIntegration: { instagramBusinessId } },
        include: { instagramIntegration: true },
    })

    if (!integration) {
        throw InstagramIntegrationNotFoundForInstagramBusinessIdError(instagramBusinessId)
    }

    return mapPrismaIntegrationToInstagramIntegration(integration)
}

export const updateInstagramIntegration = async (integrationId: string, payload: Partial<IntegrationInstagramPayload>) => {
    const integration = await prisma.integration.update({
        where: { id: integrationId },
        data: {
            instagramIntegration: {
                update: {
                    ...payload,
                },
            },
        },
        include: {
            instagramIntegration: true,
        },
    })

    if (!integration) {
        throw InstagramIntegrationNotFoundForIntegrationIdError(integrationId)
    }

    return mapPrismaIntegrationToInstagramIntegration(integration)
}

export const updateIntegrationInstagramConfiguration = async (
    integrationId: string,
    payload: Partial<IntegrationInstagramConfiguration>,
) => {
    const integration = await prisma.integration.update({
        where: { id: integrationId },
        data: {
            instagramIntegration: { update: payload },
        },
        include: {
            instagramIntegration: true,
        },
    })

    return mapPrismaIntegrationToInstagramIntegration(integration)
}

export const getOrganizationIntegrationById = async (organizationId: string, integrationId: string) => {
    const integration = await prisma.integration.findUnique({
        where: { id: integrationId, organizationId },
        include: { instagramIntegration: true },
    })

    if (!integration) {
        throw InstagramIntegrationNotFoundForIntegrationIdError(integrationId)
    }

    return mapPrismaIntegrationToInstagramIntegration(integration)
}

const mapPrismaIntegrationToInstagramIntegration = (integration: PrismaIntegrationWithRelations): Integration => {
    return {
        id: integration.id,
        type: integration.type as 'INSTAGRAM',
        organizationId: integration.organizationId,
        instagramIntegration: integration.instagramIntegration
            ? {
                  accessToken: integration.instagramIntegration.accessToken,
                  tokenType: integration.instagramIntegration.tokenType,
                  expiresIn: integration.instagramIntegration.expiresIn,
                  instagramUserId: integration.instagramIntegration.instagramUserId,
                  instagramBusinessId: integration.instagramIntegration.instagramBusinessId,
                  configuration: {
                      isBotEnabled: integration.instagramIntegration.isBotEnabled,
                      isVoiceMessageResponseEnabled: integration.instagramIntegration.isVoiceMessageResponseEnabled,
                      replyDelay: integration.instagramIntegration.replyDelay,
                      voiceMessageService: integration.instagramIntegration.voiceMessageService,
                      voiceMessageVoice: integration.instagramIntegration.voiceMessageVoice,
                  },
              }
            : null,
        createdAt: integration.createdAt,
        updatedAt: integration.updatedAt,
    }
}
