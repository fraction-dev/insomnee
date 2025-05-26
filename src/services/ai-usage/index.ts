import * as AIUsageDB from 'prisma/services/ai-usage'

interface Payload {
    organizationId: string
    tokens: number
    description?: string
}

export const logOrganizationAIUsage = async ({ organizationId, tokens, description }: Payload) => {
    await AIUsageDB.logOrganizationAIUsage({ organizationId, tokens, description })
}
