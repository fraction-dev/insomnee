import * as OrganizationDB from 'prisma/services/organization'

import { Organization, OrganizationInput } from './model'

export const createOrganization = async (userId: string, organization: OrganizationInput): Promise<Organization> => {
    const createdOrganization = await OrganizationDB.createOrganization(userId, organization)

    return createdOrganization
}

export const getUserOrganizations = async (userId: string): Promise<Organization[]> => {
    const organizations = await OrganizationDB.getUserOrganizations(userId)

    return organizations
}

export const getOrganizationById = async (organizationId: string): Promise<Organization> => {
    const organization = await OrganizationDB.getOrganizationById(organizationId)

    return organization
}
