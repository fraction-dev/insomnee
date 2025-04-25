import { MessagingView } from '~/components/messaging/messaging-view'

export default async function Page({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params

    return <MessagingView organizationId={organizationId} />
}
