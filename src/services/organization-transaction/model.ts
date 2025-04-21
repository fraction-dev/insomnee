import { OrganizationTransactionCategory } from '../organization-transaction-category/model'
import { User } from '../user/model'

export interface OrganizationTransaction {
    id: string
    description: string
    amount: number
    currency: string
    date: Date
    category: Omit<OrganizationTransactionCategory, 'createdAt' | 'updatedAt' | 'organizationId'>
    assignedTo: User | null
    attachmentUrl: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
}

export type OrganizationTransactionCreate = Omit<OrganizationTransaction, 'id' | 'createdAt' | 'updatedAt' | 'category' | 'assignedTo'> & {
    categoryId: string
    assignedTo: string
}

export type OrganizationTransactionUpdate = Partial<OrganizationTransactionCreate>
