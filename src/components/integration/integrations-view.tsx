'use client'

import { FaFacebook, FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa'

import { OrganizationIntegration, OrganizationIntegrationType } from '~/services/integration/model'

import { IntegrationCard, IntegrationCardItem } from './integration-card'

interface Props {
    integrations: OrganizationIntegration[]

    instagramAppId: string
    organizationId: string
}

export const IntegrationsView = ({ integrations, instagramAppId, organizationId }: Props) => {
    const isIntegrationConnected = (type: OrganizationIntegrationType) => {
        return integrations.some((integration) => integration.type === type)
    }

    const INTEGRATIONS: IntegrationCardItem[] = [
        {
            icon: FaInstagram,
            type: 'INSTAGRAM',
            title: 'Instagram',
            description:
                'Integrate with Instagram to enable Insomnee’s AI assistant to manage messages, comments, and bookings. Schedule posts, offer pre-orders, and create personalized business pages directly from your account.',
        },
        {
            icon: FaFacebook,
            type: 'FACEBOOK',
            title: 'Facebook',
            description:
                'Connect your Facebook account to Insomnee to automate responses to messages and comments, manage bookings, and promote pre-orders. Showcase your personalized business page to engage customers.',
            isComingSoon: true,
        },
        {
            icon: FaWhatsapp,
            type: 'WHATSAPP',
            title: 'WhatsApp',
            description:
                'Connect your WhatsApp account to Insomnee for seamless customer engagement. Our AI handles inquiries, processes bookings, and manages pre-orders, all within WhatsApp’s platform.',
            isComingSoon: true,
        },
        {
            icon: FaTelegram,
            type: 'TELEGRAM',
            title: 'Telegram',
            description:
                'Use Insomnee on Telegram to automate customer support, accept bookings, and process pre-orders. Create a branded business page accessible directly through Telegram chats.',
            isComingSoon: true,
        },
        {
            image: '/images/logos/999.png',
            type: 'SIMPALS',
            title: '999',
            description:
                'Integrate with 999.md to leverage Insomnee’s AI for responding to inquiries, managing service bookings, and promoting your business page on Moldova’s leading classifieds platform.',
            isComingSoon: true,
        },
    ]

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {INTEGRATIONS.sort((a, b) => (a.isComingSoon ? 1 : 0) - (b.isComingSoon ? 1 : 0)).map((integration) => (
                <IntegrationCard
                    key={integration.title}
                    integration={{
                        ...integration,
                        isConnected: isIntegrationConnected(integration.type),
                    }}
                    instagramAppId={instagramAppId}
                    organizationId={organizationId}
                />
            ))}
        </div>
    )
}
