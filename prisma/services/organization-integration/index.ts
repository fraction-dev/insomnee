import { OrganizationIntegrationInstagram, OrganizationIntegration as PrismaIntegration } from '@prisma/client'
import { prisma } from 'prisma/db'

import {
    InstagramIntegrationNotFoundForInstagramBusinessIdError,
    InstagramIntegrationNotFoundForIntegrationIdError,
} from '~/services/integration/errors'
import {
    OrganizationIntegration,
    OrganizationIntegrationInstagramConfiguration,
    OrganizationIntegrationInstagramPayload,
} from '~/services/integration/model'

type PrismaOrganizationIntegrationWithRelations = PrismaIntegration & {
    instagramIntegration: OrganizationIntegrationInstagram | null
}

export const addInstagramIntegration = async (
    organizationId: string,
    payload: Omit<OrganizationIntegrationInstagramPayload, 'configuration'>,
) => {
    const instagramIntegration = await prisma.organizationIntegrationInstagram.create({
        data: {
            accessToken: payload.accessToken,
            tokenType: payload.tokenType,
            expiresIn: payload.expiresIn,
            instagramUserId: `${payload.instagramUserId}`,
        },
    })

    const integration = await prisma.organizationIntegration.create({
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
    const integrations = await prisma.organizationIntegration.findMany({
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
    const integration = await prisma.organizationIntegration.findFirst({
        where: { organizationId, type: 'INSTAGRAM' },
        include: { instagramIntegration: true },
    })

    if (!integration) {
        throw InstagramIntegrationNotFoundForIntegrationIdError(organizationId)
    }

    return mapPrismaIntegrationToInstagramIntegration(integration)
}

export const getInstagramIntegrationByInstagramBusinessId = async (instagramBusinessId: string) => {
    const integration = await prisma.organizationIntegration.findFirst({
        where: { instagramIntegration: { instagramBusinessId } },
        include: { instagramIntegration: true },
    })

    if (!integration) {
        throw InstagramIntegrationNotFoundForInstagramBusinessIdError(instagramBusinessId)
    }

    return mapPrismaIntegrationToInstagramIntegration(integration)
}

export const updateInstagramIntegration = async (integrationId: string, payload: Partial<OrganizationIntegrationInstagramPayload>) => {
    const integration = await prisma.organizationIntegration.update({
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

export const updateOrganizationIntegrationInstagramConfiguration = async (
    integrationId: string,
    payload: Partial<OrganizationIntegrationInstagramConfiguration>,
) => {
    const integration = await prisma.organizationIntegration.update({
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
    const integration = await prisma.organizationIntegration.findUnique({
        where: { id: integrationId, organizationId },
        include: { instagramIntegration: true },
    })

    if (!integration) {
        throw InstagramIntegrationNotFoundForIntegrationIdError(integrationId)
    }

    return mapPrismaIntegrationToInstagramIntegration(integration)
}

const mapPrismaIntegrationToInstagramIntegration = (integration: PrismaOrganizationIntegrationWithRelations): OrganizationIntegration => {
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
