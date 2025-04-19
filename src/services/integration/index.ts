import * as IntegrationDB from 'prisma/services/integration'

import { Integration } from './model'

export const addInstagramIntegration = async (organizationId: string, code: string): Promise<Integration> => {
    const integration = await IntegrationDB.addInstagramIntegration(organizationId, code)

    return integration
}

export const getOrganizationIntegrations = async (organizationId: string): Promise<Integration[]> => {
    const integrations = await IntegrationDB.getOrganizationIntegrations(organizationId)

    return integrations
}
