export const ROUTES = {
    HOME: '/',
    AUTH: {
        INDEX: '/auth',
    },
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

        MESSAGING: (organizationId: string) => `/dashboard/${organizationId}/messaging`,
    },
    ORGANIZATION: {
        CREATE: '/organization/create',
    },
}
