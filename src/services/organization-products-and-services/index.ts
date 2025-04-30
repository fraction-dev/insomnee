import * as OrganizationProductsAndServicesDB from 'prisma/services/organization-products-and-services'
import { OrganizationProductsAndServicesCreate, OrganizationProductsAndServicesUpdate } from './model'

export const createOrganizationProductsAndServices = async (organizationId: string, data: OrganizationProductsAndServicesCreate) => {
    return OrganizationProductsAndServicesDB.createOrganizationProductsAndServices(organizationId, data)
}

export const getOrganizationProductsAndServices = async (organizationId: string) => {
    return OrganizationProductsAndServicesDB.getOrganizationProductsAndServices(organizationId)
}

export const updateOrganizationProductAndService = async (id: string, data: OrganizationProductsAndServicesUpdate) => {
    return OrganizationProductsAndServicesDB.updateOrganizationProductAndService(id, data)
}

export const deleteOrganizationProductsAndServices = async (organizationId: string, ids: string[]) => {
    return OrganizationProductsAndServicesDB.deleteOrganizationProductsAndServices(organizationId, ids)
}

export const getOrganizationProductsAndServicesCount = async (organizationId: string) => {
    return OrganizationProductsAndServicesDB.getOrganizationProductsAndServicesCount(organizationId)
}
