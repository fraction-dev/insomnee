import { VaultView } from '~/views/vault.view'

export default async function Page({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params

    return <VaultView organizationId={organizationId} />
}
