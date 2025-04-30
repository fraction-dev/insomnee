import { ProductsAndServicesView } from '~/components/products-and-services/products-and-services-view'

export default function Page({ params }: { params: { organizationId: string } }) {
    return <ProductsAndServicesView organizationId={params.organizationId} />
}
