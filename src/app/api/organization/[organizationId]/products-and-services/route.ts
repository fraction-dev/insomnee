import { NextResponse } from 'next/server'
import { z } from 'zod'

import { baseOrganizationIdSchema } from '~/app/api/organization/[organizationId]/schemas'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { BadRequestError } from '~/lib/operational-errors'
import {
    createOrganizationProductsAndServices,
    deleteOrganizationProductsAndServices,
    getOrganizationProductsAndServices,
} from '~/services/organization-products-and-services'

const bodySchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number(),
    priceStartsFrom: z.number().optional(),
    currency: z.string().min(3).max(3),
    files: z.array(z.string()),
    websiteUrlLink: z.string().optional(),
})

const deleteQueryParams = z.object({
    ids: z.string(),
})

export const POST = createRouteHandler()({ auth: true, bodySchema, paramsSchema: baseOrganizationIdSchema }, async ({ body, params }) => {
    const { organizationId } = params

    const product = await createOrganizationProductsAndServices(organizationId, body)
    return NextResponse.json({ data: product })
})

export const GET = createRouteHandler()({ auth: true, paramsSchema: baseOrganizationIdSchema }, async ({ params }) => {
    const { organizationId } = params

    const productsAndServices = await getOrganizationProductsAndServices(organizationId)
    return NextResponse.json({ data: productsAndServices })
})

export const DELETE = createRouteHandler()(
    { auth: true, paramsSchema: baseOrganizationIdSchema, querySchema: deleteQueryParams },
    async ({ params, query }) => {
        const { organizationId } = params
        const { ids } = query

        const idsArray = ids.split(',')
        if (idsArray.length === 0) {
            throw new BadRequestError('No ids provided')
        }

        await deleteOrganizationProductsAndServices(organizationId, idsArray)
        return NextResponse.json({ data: 'OK' })
    },
)
