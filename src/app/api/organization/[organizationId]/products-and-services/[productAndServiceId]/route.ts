import { NextResponse } from 'next/server'
import { z } from 'zod'
import { baseOrganizationIdSchema } from '~/app/api/organization/[organizationId]/schemas'
import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { updateOrganizationProductAndService } from '~/services/organization-products-and-services'

const paramsSchema = baseOrganizationIdSchema.merge(
    z.object({
        productAndServiceId: z.string(),
    }),
)

const bodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    currency: z.string().optional(),
    files: z.array(z.string()).optional(),
    websiteUrlLink: z.string().optional(),
})

export const PUT = createRouteHandler()({ auth: true, paramsSchema, bodySchema }, async ({ body, params }) => {
    const { productAndServiceId } = params

    const productAndService = await updateOrganizationProductAndService(productAndServiceId, body)

    return NextResponse.json({ data: productAndService })
})
