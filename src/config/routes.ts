export const ROUTES = {
    HOME: '/',
    AUTH: {
        INDEX: '/auth',
    },
    TERMS: '/terms',
    PRIVACY: '/privacy',
    DASHBOARD: {
        INDEX: '/dashboard',
        OVERVIEW: (organizationId: string) => `/dashboard/${organizationId}`,
    },
    ORGANIZATION: {
        CREATE: '/organization/create',
    },
}
