import { Integration as PrismaIntegration } from '@prisma/client'
import { prisma } from 'prisma/db'

import { InstagramIntegrationCredentials, Integration } from '~/services/integration/model'

export const addInstagramIntegration = async (organizationId: string, credentials: InstagramIntegrationCredentials) => {
    const integration = await prisma.integration.create({
        data: {
            organizationId,
            type: 'INSTAGRAM',
            credentials: {
                code: credentials.code,
                accessToken: credentials.accessToken,
                userId: credentials.userId,
            },
        },
    })

    return mapPrismaIntegrationToInstagramIntegration(integration)
}

export const getOrganizationIntegrations = async (organizationId: string) => {
    const integrations = await prisma.integration.findMany({
        where: {
            organizationId,
        },
    })

    return integrations.map(mapPrismaIntegrationToInstagramIntegration)
}

const mapPrismaIntegrationToInstagramIntegration = (integration: PrismaIntegration): Integration => {
    return {
        id: integration.id,
        type: integration.type as 'INSTAGRAM',
        credentials: integration.credentials as InstagramIntegrationCredentials,
        organizationId: integration.organizationId,
        createdAt: integration.createdAt,
        updatedAt: integration.updatedAt,
    }
}
