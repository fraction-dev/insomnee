import { z } from 'zod'

export const baseOrganizationIdSchema = z.object({
    organizationId: z.string(),
})
