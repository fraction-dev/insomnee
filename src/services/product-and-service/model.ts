import { FileUpload } from '../file-upload/model'

type ProductsAndServiceStatus = 'ACTIVE' | 'IN_REVIEW' | 'DELETED'

export interface ProductAndService {
    id: string
    name: string
    description?: string
    price: number
    currency: string
    status: ProductsAndServiceStatus
    files: FileUpload[]
    websiteUrlLink?: string
    createdAt: Date
    updatedAt: Date
}

export type ProductAndServiceCreate = Omit<ProductAndService, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'files'> & {
    files: string[]
}

export type ProductAndServiceUpdate = Omit<
    ProductAndServiceCreate,
    'name' | 'price' | 'id' | 'createdAt' | 'updatedAt' | 'currency' | 'files'
> & {
    name?: string
    price?: number
    currency?: string
    files?: string[]
}
