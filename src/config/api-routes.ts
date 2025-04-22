export const API_ROUTES = {
    ORGANIZATION: {
        INDEX: '/organization',
    },
    ORGANIZATION_TRANSACTIONS: {
        INDEX: (organizationId: string) => `/organization/${organizationId}/transaction`,
        TRANSACTION: (organizationId: string, transactionId: string) => `/organization/${organizationId}/transaction/${transactionId}`,
        DELETE: (organizationId: string) => `/organization/${organizationId}/transaction/delete`,
        ADD_FILE: (organizationId: string, transactionId: string) => `/organization/${organizationId}/transaction/${transactionId}/files`,
        REMOVE_FILE: (organizationId: string, transactionId: string, fileId: string) =>
            `/organization/${organizationId}/transaction/${transactionId}/files/${fileId}`,
    },
    ORGANIZATION_MEMBERS: {
        INDEX: (organizationId: string) => `/organization/${organizationId}/member`,
    },
    FILE_UPLOAD: {
        UPLOAD: (userId: string) => `/user/${userId}/file-upload`,
    },
}
