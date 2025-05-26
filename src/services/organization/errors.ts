import { NotFoundError } from '~/lib/shared/operational-errors'

export const OrganizationNotFoundError = (organizationId: string) => new NotFoundError(`Organization with id ${organizationId} not found`)
