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
    },
    ORGANIZATION: {
        CREATE: '/organization/create',
    },
}
