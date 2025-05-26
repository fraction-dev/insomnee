import { TransactionCategory } from '@prisma/client'

import { FileUpload } from '../file-upload/model'
import { User } from '../user/model'

export interface Transaction {
    id: string
    description: string
    amount: number
    currency: string
    date: Date
    category: Omit<TransactionCategory, 'createdAt' | 'updatedAt' | 'organizationId'>
    assignedTo: User | null
    attachmentUrl: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    files: FileUpload[]
}

export type TransactionCreate = Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'category' | 'assignedTo' | 'files'> & {
    categoryId: string
    assignedTo: string
    files: string[]
}

export type TransactionUpdate = Partial<TransactionCreate>
