import { prisma } from 'prisma/db'

export const logOrganizationAIUsage = async (organizationId: string, tokens: number, description?: string) => {
    await prisma.organizationAIUsage.create({
        data: {
            organizationId,
            tokens,
            description,
        },
    })
}
