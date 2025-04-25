import { NotFoundError } from '~/lib/operational-errors'

export const InstagramAccessTokenNotFoundError = (organizationId: string) =>
    new NotFoundError(`Instagram access token not found for organization ${organizationId}`)
