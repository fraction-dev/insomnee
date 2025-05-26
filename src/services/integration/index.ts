import * as IntegrationDB from 'prisma/services/integration'

import { Integration, IntegrationInstagramConfiguration, IntegrationInstagramPayload } from './model'

export const addInstagramIntegration = async (organizationId: string, payload: IntegrationInstagramPayload): Promise<Integration> => {
    return await IntegrationDB.addInstagramIntegration(organizationId, payload)
}

export const getOrganizationIntegrations = async (organizationId: string): Promise<Integration[]> => {
    const integrations = await IntegrationDB.getOrganizationIntegrations(organizationId)

    return integrations
}

export const getInstagramIntegrationByOrganizationId = async (organizationId: string): Promise<Integration> => {
    return await IntegrationDB.getInstagramIntegrationByOrganizationId(organizationId)
}

export const getInstagramIntegrationByInstagramBusinessId = async (instagramBusinessId: string): Promise<Integration> => {
    return await IntegrationDB.getInstagramIntegrationByInstagramBusinessId(instagramBusinessId)
}

export const updateInstagramIntegration = async (
    integrationId: string,
    payload: Partial<IntegrationInstagramPayload>,
): Promise<Integration> => {
    return await IntegrationDB.updateInstagramIntegration(integrationId, payload)
}

export const updateInstagramIntegrationConfiguration = async (
    integrationId: string,
    payload: Partial<IntegrationInstagramConfiguration>,
): Promise<Integration> => {
    return await IntegrationDB.updateIntegrationInstagramConfiguration(integrationId, payload)
}

export const getOrganizationIntegrationById = async (organizationId: string, integrationId: string): Promise<Integration> => {
    return await IntegrationDB.getOrganizationIntegrationById(organizationId, integrationId)
}
