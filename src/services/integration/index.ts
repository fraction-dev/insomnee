import * as IntegrationDB from 'prisma/services/integration'

import { InstagramIntegrationCredentials, Integration } from './model'

export const addInstagramIntegration = async (
    organizationId: string,
    credentials: InstagramIntegrationCredentials,
): Promise<Integration> => {
    const integration = await IntegrationDB.addInstagramIntegration(organizationId, credentials)

    return integration
}

export const getOrganizationIntegrations = async (organizationId: string): Promise<Integration[]> => {
    const integrations = await IntegrationDB.getOrganizationIntegrations(organizationId)

    return integrations
}
