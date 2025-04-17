import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { emailOTP } from 'better-auth/plugins'
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

    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp, type }) {
                // Implement the sendVerificationOTP method to send the OTP to the user's email address
                logger.info('[config/auth.ts] sendVerificationOTP', { email, otp, type })
            },
        }),
    ],

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
})
