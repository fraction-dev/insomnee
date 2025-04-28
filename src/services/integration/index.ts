import * as IntegrationDB from 'prisma/services/organization-integration'

import { OrganizationIntegration, OrganizationIntegrationInstagramConfiguration, OrganizationIntegrationInstagramPayload } from './model'

export const addInstagramIntegration = async (
    organizationId: string,
    payload: OrganizationIntegrationInstagramPayload,
): Promise<OrganizationIntegration> => {
    return await IntegrationDB.addInstagramIntegration(organizationId, payload)
}

export const getOrganizationIntegrations = async (organizationId: string): Promise<OrganizationIntegration[]> => {
    const integrations = await IntegrationDB.getOrganizationIntegrations(organizationId)

    return integrations
}

export const getInstagramIntegrationByOrganizationId = async (organizationId: string): Promise<OrganizationIntegration> => {
    return await IntegrationDB.getInstagramIntegrationByOrganizationId(organizationId)
}

export const getInstagramIntegrationByInstagramBusinessId = async (instagramBusinessId: string): Promise<OrganizationIntegration> => {
    return await IntegrationDB.getInstagramIntegrationByInstagramBusinessId(instagramBusinessId)
}

export const updateInstagramIntegration = async (
    integrationId: string,
    payload: Partial<OrganizationIntegrationInstagramPayload>,
): Promise<OrganizationIntegration> => {
    return await IntegrationDB.updateInstagramIntegration(integrationId, payload)
}

export const updateInstagramIntegrationConfiguration = async (
    integrationId: string,
    payload: Partial<OrganizationIntegrationInstagramConfiguration>,
): Promise<OrganizationIntegration> => {
    return await IntegrationDB.updateOrganizationIntegrationInstagramConfiguration(integrationId, payload)
}

export const getOrganizationIntegrationById = async (organizationId: string, integrationId: string): Promise<OrganizationIntegration> => {
    return await IntegrationDB.getOrganizationIntegrationById(organizationId, integrationId)
}
