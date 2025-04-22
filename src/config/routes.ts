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

        SETTINGS: (organizationId: string) => `/dashboard/${organizationId}/settings`,
        SETTINGS_CATEGORIES: (organizationId: string) => `/dashboard/${organizationId}/settings/categories`,
        SETTINGS_MEMBERS: (organizationId: string) => `/dashboard/${organizationId}/settings/members`,
        SETTINGS_NOTIFICATIONS: (organizationId: string) => `/dashboard/${organizationId}/settings/notifications`,
        AGENTS: (organizationId: string) => `/dashboard/${organizationId}/agents`,
    },
    ORGANIZATION: {
        CREATE: '/organization/create',
    },
}
