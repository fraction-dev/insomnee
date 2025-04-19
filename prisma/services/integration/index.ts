import { Integration as PrismaIntegration } from '@prisma/client'
import { prisma } from 'prisma/db'

import { Integration } from '~/services/integration/model'

export const addInstagramIntegration = async (organizationId: string, code: string) => {
    const integration = await prisma.integration.create({
        data: {
            organizationId,
            type: 'INSTAGRAM',
            credentials: {
                code,
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
        credentials: integration.credentials as { code: string },
        organizationId: integration.organizationId,
        createdAt: integration.createdAt,
        updatedAt: integration.updatedAt,
    }
}
