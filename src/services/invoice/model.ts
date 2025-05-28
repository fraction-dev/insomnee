import { z } from 'zod'

import { Customer } from '../customer/model'
import { User } from '../user/model'

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'CANCELLED' | 'UNPAID' | 'OVERDUE'

export interface InvoiceItem {
    description: string
    quantity: number
    price: number
}

export interface Invoice {
    id: string
    title: string
    number: string
    imageUrl: string | null
    dateFormat: string
    currency: string
    issueDate: Date
    dueDate: Date
    from: string
    customer: Customer | null
    items: InvoiceItem[]
    paymentDetails: string | null
    notes: string | null
    discount: number
    vat: number
    tax: number
    status: InvoiceStatus
    organizationId: string
    createdAt: Date
    updatedAt: Date
    createdBy: string
    createdByUser: User
    paidAt?: Date | null
    cancelledAt?: Date | null
    internalNotes?: string
}

export type InvoiceCreatePayload = Omit<
    Invoice & { customerId: string },
    'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'createdByUser' | 'status' | 'organizationId' | 'customer'
>

export type InvoiceUpdatePayload = Partial<
    Omit<Invoice & { customerId: string }, 'createdAt' | 'updatedAt' | 'createdBy' | 'createdByUser' | 'organizationId' | 'customer'>
>

export const createInvoiceSchema = z.object({
    title: z.string().min(1),
    number: z.string().min(1),
    imageUrl: z.string().optional(),
    dateFormat: z.string().optional(),
    currency: z.string().min(1),
    issueDate: z.string().min(1),
    dueDate: z.string().min(1),
    from: z.string().min(1),
    customerId: z.string().min(1),
    items: z.array(
        z.object({
            description: z.string().optional(),
            quantity: z.number(),
            price: z.number(),
        }),
    ),
    discount: z.number().optional(),
    vat: z.number().optional(),
    tax: z.number().optional(),
    status: z.enum(['DRAFT', 'SENT', 'PAID', 'CANCELLED', 'UNPAID', 'OVERDUE']),
    paymentDetails: z.string().optional(),
    notes: z.string().optional(),
})

export const updateInvoiceSchema = createInvoiceSchema.partial().extend({
    id: z.string().min(1),
})

export type InvoiceFormValues = z.infer<typeof createInvoiceSchema>

export interface InvoicesStatistics {
    total: {
        invoicesCount: number
        amount: number
    }
    overdue: {
        invoicesCount: number
        amount: number
    }
    paid: {
        invoicesCount: number
        amount: number
    }
    paymentScore: number
}
