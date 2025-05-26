import { createId } from '@paralleldrive/cuid2'
import { Organization as PrismaOrganization, OrganizationMember as PrismaOrganizationMember, User } from '@prisma/client'
import { prisma } from 'prisma/db'

import { OrganizationNotFoundError } from '~/services/organization/errors'
import { Organization, OrganizationInput, OrganizationLanguage, OrganizationMember } from '~/services/organization/model'

interface PrismaOrganizationWithRelations extends PrismaOrganization {
    members: PrismaOrganizationMemberWithRelations[]
}

interface PrismaOrganizationMemberWithRelations extends PrismaOrganizationMember {
    user: User
}

export const createOrganization = async (userId: string, organization: OrganizationInput): Promise<Organization> => {
    const createdOrganization = await prisma.organization.create({
        data: {
            ...organization,
            defaultLanguage: mapOrganizationLanguageToPrismaLanguage(organization.defaultLanguage),
            members: {
                create: {
                    id: createId(),
                    userId,
                    role: 'ADMIN',
                },
            },
        },
        include: {
            members: {
                include: {
                    user: true,
                },
            },
        },
    })

    return mapPrismaOrganizationToOrganizationModel(createdOrganization)
}

export const getUserOrganizations = async (userId: string): Promise<Organization[]> => {
    const organizations = await prisma.organization.findMany({
        where: {
            members: { some: { userId } },
        },
        include: {
            members: {
                include: {
                    user: true,
                },
            },
        },
    })

    return organizations.map(mapPrismaOrganizationToOrganizationModel)
}

export const getOrganizationById = async (organizationId: string): Promise<Organization> => {
    const organization = await prisma.organization.findUnique({
        where: { id: organizationId },
        include: {
            members: {
                include: {
                    user: true,
                },
            },
        },
    })

    if (!organization) {
        throw OrganizationNotFoundError(organizationId)
    }

    return mapPrismaOrganizationToOrganizationModel(organization)
}

export const updateOrganizationLogo = async (organizationId: string, logo: string) => {
    await prisma.organization.update({
        where: { id: organizationId },
        data: { logoUrl: logo },
    })
}

export const updateOrganizationName = async (organizationId: string, name: string) => {
    await prisma.organization.update({
        where: { id: organizationId },
        data: { name },
    })
}

const mapPrismaOrganizationToOrganizationModel = (organization: PrismaOrganizationWithRelations): Organization => {
    return {
        ...organization,
        members: organization.members.map(mapPrismaOrganizationMemberToOrganizationMemberModel),
        websiteUrl: organization.websiteUrl ?? '',
        isActive: organization.isActive ?? true,
        isVerified: organization.isVerified ?? false,
        verificationStatus: organization.verificationStatus ?? null,
        createdAt: organization.createdAt ?? new Date(),
        updatedAt: organization.updatedAt ?? new Date(),
        deletedAt: organization.deletedAt ?? null,
    }
}

export const getOrganizationMembers = async (organizationId: string): Promise<OrganizationMember[]> => {
    const members = await prisma.organizationMember.findMany({
        where: { organizationId },
        include: {
            user: true,
        },
    })

    return members.map(mapPrismaOrganizationMemberToOrganizationMemberModel)
}

const mapOrganizationLanguageToPrismaLanguage = (language: string): OrganizationLanguage => {
    switch (language) {
        case 'ru':
            return 'RU'
        case 'en':
            return 'EN'
        case 'ro':
            return 'RO'
        case 'ua':
            return 'UA'
        default:
            return language as OrganizationLanguage
    }
}

export const mapPrismaOrganizationMemberToOrganizationMemberModel = (member: PrismaOrganizationMemberWithRelations): OrganizationMember => {
    return {
        id: member.id,
        role: member.role,
        organizationId: member.organizationId,
        user: member.user,
    }
}
