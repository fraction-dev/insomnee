import { OrganizationMember as PrismaOrganizationMember } from '@prisma/client'
import { prisma } from 'prisma/db'

import { OrganizationMember } from '~/services/organization/model'
import { User } from '~/services/user/model'

type PrismaOrganizationMemberWithRelations = PrismaOrganizationMember & {
    user: User
}

export const getOrganizationMembers = async (organizationId: string) => {
    const organizationMembers = await prisma.organizationMember.findMany({
        where: {
            organizationId,
        },
        include: {
            user: true,
        },
    })

    return organizationMembers.map(mapPrismaOrganizationMemberToOrganizationMember)
}

export const getOrganizationMembersCount = async (organizationId: string) => {
    const count = await prisma.organizationMember.count({
        where: {
            organizationId,
        },
    })

    return count
}

const mapPrismaOrganizationMemberToOrganizationMember = (
    prismaOrganizationMember: PrismaOrganizationMemberWithRelations,
): OrganizationMember => {
    return {
        id: prismaOrganizationMember.id,
        role: prismaOrganizationMember.role,
        organizationId: prismaOrganizationMember.organizationId,
        user: prismaOrganizationMember.user,
    }
}
