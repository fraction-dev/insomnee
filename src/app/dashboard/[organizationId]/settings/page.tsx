import { SettingsGeneralView } from '~/components/settings/settings-general/settings-general-view'

export default async function Page({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params

    return <SettingsGeneralView organizationId={organizationId} />
}
