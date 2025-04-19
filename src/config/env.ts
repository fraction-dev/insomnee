import { z, ZodError } from 'zod'
import { createMessageBuilder, fromError } from 'zod-validation-error'

const getAppUrl = () => {
    if (!process.env.NODE_ENV) {
        throw new ZodError([{ code: 'custom', message: 'NODE_ENV is required', path: ['NODE_ENV'] }])
    }

    if (process.env.NODE_ENV === 'development') {
        return process.env.BASE_URL ?? 'http://localhost:3000'
    }

    if (!process.env.BASE_URL || process.env.BASE_URL === 'http://localhost:3000') {
        throw new ZodError([{ code: 'custom', message: 'BASE_URL is required for production environment', path: ['BASE_URL'] }])
    }

    return process.env.BASE_URL
}

const prepareToValidate = (variableName: string) => {
    return z
        .string({
            required_error: `Required: Set ${variableName} environment variable`,
            invalid_type_error: `${variableName} must be a string`,
        })
        .min(1, { message: `${variableName} environment variable is required` })
}

/**
 * All environment variables are required for the application to run.
 */
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']).default('development') as z.ZodDefault<z.ZodEnum<['development', 'production']>>,
    BASE_URL: z.string().url().default(getAppUrl()),

    DATABASE_URL: prepareToValidate('DATABASE_URL'),

    BETTER_AUTH_SECRET: prepareToValidate('BETTER_AUTH_SECRET'),
    GOOGLE_CLIENT_ID: prepareToValidate('GOOGLE_CLIENT_ID'),
    GOOGLE_CLIENT_SECRET: prepareToValidate('GOOGLE_CLIENT_SECRET'),

    META_APP_ID: prepareToValidate('META_APP_ID'),
    META_APP_SECRET: prepareToValidate('META_APP_SECRET'),

    INSTAGRAM_APP_ID: prepareToValidate('INSTAGRAM_APP_ID'),
    INSTAGRAM_APP_SECRET: prepareToValidate('INSTAGRAM_APP_SECRET'),
    INSTAGRAM_TESTER_ACCESS_TOKEN: prepareToValidate('INSTAGRAM_TESTER_ACCESS_TOKEN'),

    NGROK_URL: prepareToValidate('NGROK_URL'),
})

const getEnv = () => {
    try {
        const parsed = envSchema.parse(process.env)

        return parsed
    } catch (error) {
        const validationError = fromError(error, {
            messageBuilder: createMessageBuilder({
                includePath: false,
                maxIssuesInMessage: 1,
                prefix: '[config/env.ts]',
                issueSeparator: '\n',
            }),
        })

        throw new Error(validationError.toString())
    }
}

export const env = getEnv()
