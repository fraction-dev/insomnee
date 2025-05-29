import { z } from 'zod'

export const Params = z.object({
    organizationId: z.string(),
})
