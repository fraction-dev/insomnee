import { z } from 'zod'

export const baseUserSchema = z.object({
    userId: z.string(),
})
