import { Metadata } from 'next'

import { MessagingView } from '~/components/messaging/messaging-view'

export const metadata: Metadata = {
    title: 'Messaging | Insomnee',
    description: 'Messaging never been easier than with Insomnee',
}

export default async function Page({ params }: { params: Promise<{ organizationId: string }> }) {
    const { organizationId } = await params

    return <MessagingView organizationId={organizationId} />
}
