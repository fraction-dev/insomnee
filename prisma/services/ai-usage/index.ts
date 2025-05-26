import { prisma } from 'prisma/db'

export const logOrganizationAIUsage = async ({
    organizationId,
    tokens,
    description,
}: {
    organizationId: string
    tokens: number
    description?: string
}) => {
    await prisma.aIUsage.create({
        data: {
            organizationId,
            tokens,
            description,
        },
    })
}
