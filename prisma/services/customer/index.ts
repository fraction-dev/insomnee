import { Customer as PrismaCustomer, Organization as PrismaOrganization, User as PrismaUser } from '@prisma/client'
import { prisma } from 'prisma/db'

import { NotFoundException } from '~/core/exception'
import { Customer, CustomerCreatePayload, CustomerUpdatePayload } from '~/services/customer/model'

type PrismaCustomerWithRelations = PrismaCustomer & {
    createdByUser: PrismaUser
    organization: PrismaOrganization
}

const INCLUDE_CLAUSE = {
    createdByUser: true,
    organization: true,
}

export const getOrganizationCustomers = async (organizationId: string) => {
    const customers = await prisma.customer.findMany({
        where: { organizationId, status: 'ACTIVE' },
        include: INCLUDE_CLAUSE,
        orderBy: { createdAt: 'desc' },
    })

    return customers.map(mapPrismaToModel)
}

export const createCustomer = async (userId: string, organizationId: string, data: CustomerCreatePayload): Promise<Customer> => {
    const customer = await prisma.customer.create({
        data: {
            ...data,
            email: data.email ?? '',
            organization: { connect: { id: organizationId } },
            createdByUser: { connect: { id: userId } },
        },
        include: INCLUDE_CLAUSE,
    })

    return mapPrismaToModel(customer)
}

export const updateCustomer = async (userId: string, organizationId: string, data: CustomerUpdatePayload) => {
    const customer = await prisma.customer.update({
        where: { id: data.id, organizationId, createdByUser: { id: userId } },
        data: {
            name: data.name,
            email: data.email,
            websiteUrl: data.websiteUrl,
            contactPerson: data.contactPerson,
            phoneNumber: data.phoneNumber,
            country: data.country,
            city: data.city,
            notes: data.notes,
            vatNumber: data.vatNumber,
            state: data.state,
            zipCode: data.zipCode,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
        },
        include: INCLUDE_CLAUSE,
    })

    if (!customer) {
        throw new NotFoundException(`Customer with id ${data.id} not found`)
    }

    return mapPrismaToModel(customer)
}

export const archiveManyCustomers = async (userId: string, organizationId: string, ids: string[]) => {
    await prisma.customer.updateMany({
        where: { id: { in: ids }, organizationId, createdByUser: { id: userId } },
        data: { status: 'ARCHIVED' },
    })
}

const mapPrismaToModel = (customer: PrismaCustomerWithRelations): Customer => {
    return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phoneNumber: customer.phoneNumber ?? '',
        avatarUrl: customer.avatarUrl ?? '',
        country: customer.country ?? '',
        city: customer.city ?? '',
        addressLine1: customer.addressLine1 ?? '',
        addressLine2: customer.addressLine2 ?? '',
        zipCode: customer.zipCode ?? '',
        state: customer.state ?? '',
        vatNumber: customer.vatNumber ?? '',
        websiteUrl: customer.websiteUrl ?? '',
        notes: customer.notes ?? '',
        status: customer.status,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
        createdBy: customer.createdByUser,
        contactPerson: customer.contactPerson ?? '',
    }
}
