import { NextResponse } from 'next/server'
import { z } from 'zod'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { createOrganization } from '~/services/organization'
import { OrganizationCurrency, OrganizationLanguage } from '~/services/organization/model'

const bodySchema = z.object({
    name: z.string().min(1),
    defaultLanguage: z.string().min(1),
    defaultCurrency: z.string().min(1),
    phone: z.string().min(1),
    websiteUrl: z.string().url(),
})

export const POST = createRouteHandler()({ auth: true, bodySchema }, async ({ body, userId }) => {
    const organization = await createOrganization(userId, {
        name: body.name,
        defaultLanguage: body.defaultLanguage as OrganizationLanguage,
        defaultCurrency: body.defaultCurrency as OrganizationCurrency,
        phone: body.phone,
        websiteUrl: body.websiteUrl,
    })

    return NextResponse.json({ data: organization })
})
