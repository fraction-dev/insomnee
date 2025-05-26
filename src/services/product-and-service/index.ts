import * as ProductAndServiceDB from 'prisma/services/product-and-service'

import { ProductAndServiceCreate, ProductAndServiceUpdate } from './model'

export const createOrganizationProductsAndServices = async (organizationId: string, data: ProductAndServiceCreate) => {
    return ProductAndServiceDB.createOrganizationProductsAndServices(organizationId, data)
}

export const getOrganizationProductsAndServices = async (organizationId: string) => {
    return ProductAndServiceDB.getOrganizationProductsAndServices(organizationId)
}

export const updateOrganizationProductAndService = async (id: string, data: ProductAndServiceUpdate) => {
    return ProductAndServiceDB.updateOrganizationProductAndService(id, data)
}

export const deleteOrganizationProductsAndServices = async (organizationId: string, ids: string[]) => {
    return ProductAndServiceDB.deleteOrganizationProductsAndServices(organizationId, ids)
}

export const getOrganizationProductsAndServicesCount = async (organizationId: string) => {
    return ProductAndServiceDB.getOrganizationProductsAndServicesCount(organizationId)
}
