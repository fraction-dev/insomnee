import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { username } from 'better-auth/plugins'
import { prisma } from 'prisma/db'
import logger from '~/core/logger'
import { env } from './env'

export const auth = betterAuth({
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BASE_URL,

    trustedOrigins: [env.BASE_URL],

    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),

    plugins: [username()],

    emailAndPassword: {
        enabled: false,
    },

    socialProviders: {
        google: {
            enabled: true,
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        },
    },

    onAPIError: {
        throw: true,
        onError: (error) => {
            logger.error('[config/auth.ts] Error on API', { error })
        },
    },
})
