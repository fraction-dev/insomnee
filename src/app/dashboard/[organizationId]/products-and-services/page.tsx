import { Metadata } from 'next'

import { ProductsAndServicesView } from '~/components/products-and-services/products-and-services-view'

export const metadata: Metadata = {
    title: 'Products and Services | Insomnee',
    description: 'Create, manage and track your products and services',
}

export default async function Page({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params

    return <ProductsAndServicesView organizationId={organizationId} />
}
