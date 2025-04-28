import { NotFoundError } from '~/lib/operational-errors'

export const IntegrationNotFoundError = (organizationId: string, integrationType: string) =>
    new NotFoundError(`Integration ${integrationType} not found for organization ${organizationId}`)

export const InstagramIntegrationNotFoundForIntegrationIdError = (integrationId: string) =>
    new NotFoundError(`Instagram integration not found for integration id ${integrationId}`)

export const InstagramIntegrationNotFoundForInstagramBusinessIdError = (instagramBusinessId: string) =>
    new NotFoundError(`Instagram integration not found for instagram business id ${instagramBusinessId}`)
