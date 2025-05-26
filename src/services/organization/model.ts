import { User } from '../user/model'

export type OrganizationLanguage = 'RU' | 'EN' | 'RO' | 'UA'
export type OrganizationCurrency = 'MDL' | 'USD' | 'EUR' | 'RON' | 'UAH'
type OrganizationVerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED'

export interface Organization {
    id: string
    name: string
    defaultLanguage: OrganizationLanguage
    defaultCurrency: OrganizationCurrency
    websiteUrl: string
    logoUrl: string | null
    address: string | null
    phone: string | null
    email: string | null
    city: string | null
    country: string | null
    registrationNumber: string | null
    referralCode: string | null
    isActive: boolean
    isVerified: boolean
    verificationStatus: OrganizationVerificationStatus | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    members: OrganizationMember[]
}

export type OrganizationMemberRole = 'ADMIN' | 'MEMBER' | 'GUEST'

export interface OrganizationMember {
    id: string
    organizationId: string
    role: OrganizationMemberRole
    user: User
}

export type OrganizationInput = Pick<Organization, 'name' | 'defaultLanguage' | 'defaultCurrency' | 'phone' | 'websiteUrl'>
