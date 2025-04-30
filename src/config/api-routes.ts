export const API_ROUTES = {
    ORGANIZATION: {
        INDEX: '/organization',
        GET: (organizationId: string) => `/organization/${organizationId}`,
        UPDATE_LOGO: (organizationId: string) => `/organization/${organizationId}/logo`,
        UPDATE_NAME: (organizationId: string) => `/organization/${organizationId}/name`,
    },
    ORGANIZATION_TRANSACTIONS: {
        INDEX: (organizationId: string) => `/organization/${organizationId}/transaction`,
        TRANSACTION: (organizationId: string, transactionId: string) => `/organization/${organizationId}/transaction/${transactionId}`,
        DELETE: (organizationId: string) => `/organization/${organizationId}/transaction/delete`,
        ADD_FILE: (organizationId: string, transactionId: string) => `/organization/${organizationId}/transaction/${transactionId}/files`,
        REMOVE_FILE: (organizationId: string, transactionId: string, fileId: string) =>
            `/organization/${organizationId}/transaction/${transactionId}/files/${fileId}`,
    },
    ORGANIZATION_PRODUCTS_AND_SERVICES: {
        INDEX: (organizationId: string) => `/organization/${organizationId}/products-and-services`,
        PRODUCT_AND_SERVICE: (organizationId: string, productAndServiceId: string) =>
            `/organization/${organizationId}/products-and-services/${productAndServiceId}`,
    },
    ORGANIZATION_MEMBERS: {
        INDEX: (organizationId: string) => `/organization/${organizationId}/member`,
    },
    ORGANIZATION_INTEGRATIONS: {
        INDEX: (organizationId: string) => `/organization/${organizationId}/integrations`,
        GET: (organizationId: string, integrationId: string) => `/organization/${organizationId}/integrations/${integrationId}`,
        INSTAGRAM: {
            UPDATE_CONFIGURATION: (organizationId: string, integrationId: string) =>
                `/organization/${organizationId}/integrations/${integrationId}/instagram`,
        },
    },
    FILE_UPLOAD: {
        UPLOAD: (userId: string) => `/user/${userId}/file-upload`,
    },
    DIALOGS: {
        INSTAGRAM: {
            INDEX: (organizationId: string) => `/organization/${organizationId}/dialogs/instagram`,
            MESSAGE: (organizationId: string) => `/organization/${organizationId}/dialogs/instagram/message`,
        },
    },
}
