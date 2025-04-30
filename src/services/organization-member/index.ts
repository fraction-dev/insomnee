import * as OrganizationMemberDB from 'prisma/services/organization-member'

export const getOrganizationMembers = async (organizationId: string) => {
    return OrganizationMemberDB.getOrganizationMembers(organizationId)
}

export const getOrganizationMembersCount = async (organizationId: string) => {
    return OrganizationMemberDB.getOrganizationMembersCount(organizationId)
}
