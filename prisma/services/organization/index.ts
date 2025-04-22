import { createId } from '@paralleldrive/cuid2'
import { OrganizationMember, Organization as PrismaOrganization } from '@prisma/client'
import { prisma } from 'prisma/db'

import { OrganizationNotFoundError } from '~/services/organization/errors'
import { Organization, OrganizationInput, OrganizationLanguage } from '~/services/organization/model'

interface PrismaOrganizationWithRelations extends PrismaOrganization {
    members: OrganizationMember[]
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
            members: true,
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
            members: true,
        },
    })

    return organizations.map(mapPrismaOrganizationToOrganizationModel)
}

export const getOrganizationById = async (organizationId: string): Promise<Organization> => {
    const organization = await prisma.organization.findUnique({
        where: { id: organizationId },
        include: {
            members: true,
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
        members: organization.members.map((member) => ({
            id: member.id,
            organizationId: member.organizationId,
            userId: member.userId,
            role: member.role,
        })),
        isActive: organization.isActive ?? true,
        isVerified: organization.isVerified ?? false,
        verificationStatus: organization.verificationStatus ?? null,
        createdAt: organization.createdAt ?? new Date(),
        updatedAt: organization.updatedAt ?? new Date(),
        deletedAt: organization.deletedAt ?? null,
    }
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
