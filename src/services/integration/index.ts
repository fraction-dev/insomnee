import * as IntegrationDB from 'prisma/services/organization-integration'

import { OrganizationIntegration, OrganizationIntegrationInstagramPayload } from './model'

export const addInstagramIntegration = async (
    organizationId: string,
    payload: OrganizationIntegrationInstagramPayload,
): Promise<OrganizationIntegration> => {
    const integration = await IntegrationDB.addInstagramIntegration(organizationId, payload)

    return integration
}

export const getOrganizationIntegrations = async (organizationId: string): Promise<OrganizationIntegration[]> => {
    const integrations = await IntegrationDB.getOrganizationIntegrations(organizationId)

    return integrations
}

export const getInstagramIntegrationByOrganizationId = async (organizationId: string): Promise<OrganizationIntegration> => {
    return await IntegrationDB.getInstagramIntegrationByOrganizationId(organizationId)
}
