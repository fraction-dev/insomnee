import * as OrganizationDB from 'prisma/services/organization'

import { createOrganizationDummyTransactions } from '../organization-transaction'
import { bootstrapOrganizationTransactionCategories } from '../organization-transaction-category'
import { Organization, OrganizationInput } from './model'

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

const bootstrapOrganization = async (organization: Organization) => {
    /**
     * 1. Create transaction categories
     */
    await bootstrapOrganizationTransactionCategories(organization.id)

    /**
     * ! TEST PURPOSES ONLY !
     * Create dummy transactions
     */
    await createOrganizationDummyTransactions(organization.id)
}
