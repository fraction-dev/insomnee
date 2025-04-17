import { NotFoundError } from '~/lib/operational-errors'

export const OrganizationNotFoundError = (organizationId: string) => new NotFoundError(`Organization with id ${organizationId} not found`)
