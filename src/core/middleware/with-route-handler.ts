import { Session } from 'better-auth'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError, ZodSchema } from 'zod'
import { fromError } from 'zod-validation-error'

import { auth } from '~/config/auth'
import { getURLSearchParams } from '~/lib/url'
import { BaseResponse } from '~/types/response'

import logger from '../logger'

type HandlerConfig = { auth?: boolean }

type InferSchemaType<T extends ZodSchema> = T extends ZodSchema<infer U> ? U : never

type RouteHandlerContext<
    BodySchema extends ZodSchema = ZodSchema,
    ParamsSchema extends ZodSchema = ZodSchema,
    QuerySchema extends ZodSchema = ZodSchema,
> = {
    req: NextRequest
    body: BodySchema extends ZodSchema ? InferSchemaType<BodySchema> : unknown
    params: ParamsSchema extends ZodSchema ? InferSchemaType<ParamsSchema> : null
    query: QuerySchema extends ZodSchema ? InferSchemaType<QuerySchema> : null
    headers: Headers
    session: Session | null
    userId: string
}

const getErrorDetails = (error: unknown): { message: string; statusCode: number; stack?: string } => {
    if (error instanceof ZodError) {
        return { message: fromError(error).message.toString(), statusCode: 400 }
    }

    if (error instanceof Error) {
        return { message: error.message, statusCode: 500 }
    }

    if (typeof error === 'string') {
        return { message: error, statusCode: 500 }
    }

    return { message: 'An unknown error occurred', statusCode: 500 }
}

function getHeaders(req: NextRequest) {
    const headers = new Headers(req.headers)
    return Object.fromEntries(headers.entries())
}

async function readRequestBody(req: NextRequest) {
    if (!req.body) return null

    const reader = req.body.getReader()
    const chunks = []

    while (true) {
        const { done, value } = await reader.read()
        if (done) break
        chunks.push(value)
    }

    const body = Buffer.concat(chunks).toString('utf-8')
    return body ? JSON.parse(body) : null
}

export function createRouteHandler<T>() {
    return function handler<
        Injection extends Record<string, unknown> = Record<string, unknown>,
        BodySchema extends ZodSchema = ZodSchema,
        ParamsSchema extends ZodSchema = ZodSchema,
        QuerySchema extends ZodSchema = ZodSchema,
        Config extends HandlerConfig = HandlerConfig,
    >(
        options: {
            inject?: Injection
            bodySchema?: BodySchema
            paramsSchema?: ParamsSchema
            querySchema?: QuerySchema
        } & Config,
        handlerFn: (context: RouteHandlerContext<BodySchema, ParamsSchema, QuerySchema>) => Promise<NextResponse<BaseResponse<T>>>,
    ) {
        return async (
            req: NextRequest,
            context?: {
                params?: Record<string, string> | Promise<Record<string, string>>
            },
        ) => {
            let body = null
            let params = null
            let query = null

            try {
                const { bodySchema, paramsSchema, querySchema } = options

                const contentType = req.headers.get('content-type')
                let rawBody = null

                if (contentType?.includes('multipart/form-data')) {
                    rawBody = await req.formData()
                } else if (req.body) {
                    const reader = req.body.getReader()
                    const chunks = []

                    while (true) {
                        const { done, value } = await reader.read()
                        if (done) break
                        chunks.push(value)
                    }

                    const bodyText = Buffer.concat(chunks).toString('utf-8')
                    rawBody = bodyText ? JSON.parse(bodyText) : null
                }

                const [parsedBody, parsedParams, parsedQuery] = await Promise.all([
                    bodySchema ? bodySchema.parse(rawBody) : rawBody,
                    paramsSchema ? paramsSchema.parse(context?.params ? await context?.params : null) : null,
                    querySchema ? querySchema.parse(getURLSearchParams(req.url)) : null,
                ])

                body = parsedBody
                params = parsedParams
                query = parsedQuery

                const session = await auth.api.getSession({
                    headers: await headers(),
                })

                if (options.auth && !session?.session) {
                    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
                }

                return await handlerFn({
                    req,
                    body,
                    params,
                    query,
                    headers: req.headers,
                    session: session?.session ?? null,
                    userId: session?.session?.userId ?? '',
                })
            } catch (error) {
                const { message, statusCode, stack } = getErrorDetails(error)
                const headers = getHeaders(req)

                logger.error(message, {
                    pathname: req.nextUrl.pathname,
                    headers,
                    body,
                    code: statusCode,
                    error,
                    stack,
                })

                const responseBody = {
                    message,
                    code: statusCode,
                    timestamp: new Date().toISOString(),
                    pathname: req.nextUrl.pathname,
                    query: req.nextUrl.search,
                }

                return NextResponse.json(responseBody, { status: statusCode })
            }
        }
    }
}
