import { NotFoundError } from '~/lib/operational-errors'

export const IntegrationNotFoundError = (organizationId: string, integrationType: string) =>
    new NotFoundError(`Integration ${integrationType} not found for organization ${organizationId}`)
