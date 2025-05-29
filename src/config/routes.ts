export const ROUTES = {
    HOME: '/',
    AUTH: '/auth',
    TERMS: '/terms',
    PRIVACY: '/privacy',
    DASHBOARD: {
        INDEX: '/dashboard',

        OVERVIEW: (organizationId: string) => `/dashboard/${organizationId}/overview`,
        INTEGRATIONS: (organizationId: string) => `/dashboard/${organizationId}/integrations`,
        WEB_CARD: (organizationId: string) => `/dashboard/${organizationId}/webcard`,
        TRANSACTIONS: (organizationId: string) => `/dashboard/${organizationId}/transactions`,
        SETTINGS: {
            INDEX: (organizationId: string) => `/dashboard/${organizationId}/settings`,
            CATEGORIES: (organizationId: string) => `/dashboard/${organizationId}/settings/categories`,
            MEMBERS: (organizationId: string) => `/dashboard/${organizationId}/settings/members`,
            NOTIFICATIONS: (organizationId: string) => `/dashboard/${organizationId}/settings/notifications`,
            AGENTS: (organizationId: string) => `/dashboard/${organizationId}/settings/agents`,
        },
        PRODUCTS_AND_SERVICES: (organizationId: string) => `/dashboard/${organizationId}/products-and-services`,
        MESSAGING: (organizationId: string) => `/dashboard/${organizationId}/messaging`,
        CUSTOMERS: (organizationId: string) => `/dashboard/${organizationId}/customers`,
        INVOICES: (organizationId: string) => `/dashboard/${organizationId}/invoices`,
        VAULT: (organizationId: string) => `/dashboard/${organizationId}/vault`,
    },
    ORGANIZATION: {
        CREATE: '/organization/create',
    },
    INVOICE: (invoiceId: string) => `/invoice/${invoiceId}`,
}
