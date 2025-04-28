import * as OrganizationAIUsageDB from 'prisma/services/organization-ai-usage'

interface Payload {
    organizationId: string
    tokens: number
    description?: string
}

export const logOrganizationAIUsage = async ({ organizationId, tokens, description }: Payload) => {
    await OrganizationAIUsageDB.logOrganizationAIUsage(organizationId, tokens, description)
}
