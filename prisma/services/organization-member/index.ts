import { OrganizationMember as PrismaOrganizationMember } from '@prisma/client'
import { prisma } from 'prisma/db'
import { OrganizationMember } from '~/services/organization-member/model'
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

    console.log({ organizationMembers: JSON.stringify(organizationMembers, null, 2) })

    return organizationMembers.map(mapPrismaOrganizationMemberToOrganizationMember)
}

const mapPrismaOrganizationMemberToOrganizationMember = (
    prismaOrganizationMember: PrismaOrganizationMemberWithRelations,
): OrganizationMember => {
    return {
        id: prismaOrganizationMember.id,
        userId: prismaOrganizationMember.user.id,
        email: prismaOrganizationMember.user.email,
        fullName: prismaOrganizationMember.user.name || prismaOrganizationMember.user.email,
        image: prismaOrganizationMember.user.image,
    }
}
