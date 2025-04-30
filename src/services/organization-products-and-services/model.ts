import { FileUpload } from '../file-upload/model'

type OrganizationProductsAndServiceStatus = 'ACTIVE' | 'IN_REVIEW' | 'DELETED'

export interface OrganizationProductsAndServices {
    id: string
    name: string
    description?: string
    price: number
    currency: string
    status: OrganizationProductsAndServiceStatus
    files: FileUpload[]
    websiteUrlLink?: string
    createdAt: Date
    updatedAt: Date
}

export type OrganizationProductsAndServicesCreate = Omit<
    OrganizationProductsAndServices,
    'id' | 'createdAt' | 'updatedAt' | 'status' | 'files'
> & {
    files: string[]
}

export type OrganizationProductsAndServicesUpdate = Omit<
    OrganizationProductsAndServicesCreate,
    'name' | 'price' | 'id' | 'createdAt' | 'updatedAt' | 'currency' | 'files'
> & {
    name?: string
    price?: number
    currency?: string
    files?: string[]
}
