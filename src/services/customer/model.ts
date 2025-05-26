import { z } from 'zod'

import { Organization } from '../organization/model'
import { User } from '../user/model'

export type CustomerStatus = 'ACTIVE' | 'ARCHIVED'

export interface Customer {
    id: string
    name: string
    email?: string
    websiteUrl?: string
    phoneNumber?: string
    avatarUrl?: string
    country?: string
    city?: string
    notes?: string
    vatNumber?: string
    state?: string
    zipCode?: string
    addressLine1?: string
    addressLine2?: string
    status: CustomerStatus
    createdAt: Date
    updatedAt: Date
    createdBy: User
    organization?: Organization
    contactPerson?: string
}

export type CustomerCreatePayload = Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'status' | 'organization'>
export type CustomerUpdatePayload = Omit<Customer, 'createdAt' | 'updatedAt' | 'createdBy' | 'organization' | 'name'> & {
    name?: string
}

export const customerCreateSchema = z
    .object({
        name: z.string().min(1),
        email: z.string().optional(),
        websiteUrl: z.string().optional(),
        contactPerson: z.string().optional(),
        phoneNumber: z.string().optional(),
        country: z.string().optional(),
        city: z.string().optional(),
        notes: z.string().optional(),
        vatNumber: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().optional(),
        addressLine1: z.string().optional(),
        addressLine2: z.string().optional(),
    })
    .refine((data) => (data.email ? z.string().email().safeParse(data.email).success : true), { message: 'Invalid email' })
    .refine((data) => (data.websiteUrl ? z.string().url().safeParse(data.websiteUrl).success : true), { message: 'Invalid website URL' })

export const customerUpdateSchema = z
    .object({
        id: z.string().min(1),
        name: z.string().min(1).optional(),
        email: z.string().optional(),
        websiteUrl: z.string().optional(),
        contactPerson: z.string().optional(),
        phoneNumber: z.string().optional(),
        country: z.string().optional(),
        city: z.string().optional(),
        notes: z.string().optional(),
        vatNumber: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().optional(),
        addressLine1: z.string().optional(),
        addressLine2: z.string().optional(),
        status: z.enum(['ACTIVE', 'ARCHIVED']).optional(),
    })
    .refine((data) => (data.email ? z.string().email().safeParse(data.email).success : true), { message: 'Invalid email' })
    .refine((data) => (data.websiteUrl ? z.string().url().safeParse(data.websiteUrl).success : true), { message: 'Invalid website URL' })

export const customersDeleteManySchema = z.object({
    ids: z.array(z.string()),
})
