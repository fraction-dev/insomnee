import * as OrganizationMemberDB from 'prisma/services/organization-member'

export const getOrganizationMembers = async (organizationId: string) => {
    return OrganizationMemberDB.getOrganizationMembers(organizationId)
}
