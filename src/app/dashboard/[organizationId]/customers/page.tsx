import { CustomersView } from '~/views/customers.view'

export default async function Page({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params

    return <CustomersView organizationId={organizationId} />
}
