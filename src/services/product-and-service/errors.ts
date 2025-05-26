import { NotFoundError } from '~/lib/shared/operational-errors'

export const OrganizationProductAndServiceNotFoundError = (id: string) => new NotFoundError(`Product or service with id ${id} not found`)
