import { faker } from '@faker-js/faker'
import { randomInt } from 'crypto'
import * as OrganizationDB from 'prisma/services/organization'

import { bootstrapOrganizationTransactionCategories } from '../transaction-category'
import { Organization, OrganizationInput, OrganizationMember } from './model'

export const createOrganization = async (userId: string, organization: OrganizationInput): Promise<Organization> => {
    const createdOrganization = await OrganizationDB.createOrganization(userId, organization)

    await bootstrapOrganization(createdOrganization)

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

export const updateOrganizationLogo = async (organizationId: string, logo: string) => {
    await OrganizationDB.updateOrganizationLogo(organizationId, logo)
}

export const updateOrganizationName = async (organizationId: string, name: string) => {
    await OrganizationDB.updateOrganizationName(organizationId, name)
}

export const getOrganizationMembers = async (organizationId: string): Promise<OrganizationMember[]> => {
    return await OrganizationDB.getOrganizationMembers(organizationId)
}

export const getTotalOrganizationsCount = async (): Promise<number> => {
    return await OrganizationDB.getTotalOrganizationsCount()
}

export const simulateOrganizationMetrics = async () => {
    /**
     * Generate random from 50 to 100 organizations
     */
    const organizationsCount = randomInt(50, 100)

    for (let i = 0; i < organizationsCount; i++) {
        const organization = await createOrganization(faker.string.uuid(), {
            name: faker.company.name(),
            defaultLanguage: 'EN',
            defaultCurrency: 'USD',
            phone: faker.phone.number(),
            websiteUrl: faker.internet.url(),
            simulationStatus: 'SIMULATED',
        })

        await bootstrapOrganization(organization)
    }
}

const bootstrapOrganization = async (organization: Organization) => {
    /**
     * 1. Create transaction categories
     */
    await bootstrapOrganizationTransactionCategories(organization.id)
}
