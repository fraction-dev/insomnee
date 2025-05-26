import * as CustomerDB from 'prisma/services/customer'

import { Customer, CustomerCreatePayload, CustomerUpdatePayload } from './model'

export const getOrganizationCustomers = async (organizationId: string): Promise<Customer[]> => {
    return await CustomerDB.getOrganizationCustomers(organizationId)
}

export const createCustomer = async (userId: string, organizationId: string, data: CustomerCreatePayload): Promise<Customer> => {
    return await CustomerDB.createCustomer(userId, organizationId, data)
}

export const updateCustomer = async (userId: string, organizationId: string, data: CustomerUpdatePayload): Promise<Customer> => {
    return await CustomerDB.updateCustomer(userId, organizationId, data)
}

export const archiveManyCustomers = async (userId: string, organizationId: string, ids: string[]): Promise<void> => {
    return await CustomerDB.archiveManyCustomers(userId, organizationId, ids)
}
