export const API_ROUTES = {
    ORGANIZATION: {
        INDEX: '/organization',
    },
    ORGANIZATION_TRANSACTIONS: {
        INDEX: (organizationId: string) => `/organization/${organizationId}/transaction`,
        TRANSACTION: (organizationId: string, transactionId: string) => `/organization/${organizationId}/transaction/${transactionId}`,
        DELETE: (organizationId: string) => `/organization/${organizationId}/transaction/delete`,
    },
    ORGANIZATION_MEMBERS: {
        INDEX: (organizationId: string) => `/organization/${organizationId}/member`,
    },
}
