import { ConflictError, NotFoundError } from '~/lib/shared/operational-errors'

export const OrganizationMessagingAgentAlreadyExistsError = (agentId: string) =>
    new ConflictError(`Organization messaging agent already exists, id: ${agentId}`)

export const OrganizationMessagingAgentNotFoundError = (integrationId: string) =>
    new NotFoundError(`Organization messaging agent not found, integrationId: ${integrationId}`)
