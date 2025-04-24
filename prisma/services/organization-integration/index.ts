import { OrganizationIntegrationInstagram, OrganizationIntegration as PrismaIntegration } from '@prisma/client'
import { prisma } from 'prisma/db'

import { OrganizationIntegration, OrganizationIntegrationInstagramPayload } from '~/services/integration/model'

type PrismaOrganizationIntegrationWithRelations = PrismaIntegration & {
    instagramIntegration: OrganizationIntegrationInstagram | null
}

export const addInstagramIntegration = async (organizationId: string, payload: OrganizationIntegrationInstagramPayload) => {
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
              }
            : null,
        createdAt: integration.createdAt,
        updatedAt: integration.updatedAt,
    }
}
