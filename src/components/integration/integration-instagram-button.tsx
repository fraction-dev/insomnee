'use client'

import { Button } from '../ui/button'

interface Props {
    appId: string
    organizationId: string
}

const getRedirectURI = () => {
    if (process.env.NODE_ENV === 'development') {
        return `https://caring-kangaroo-composed.ngrok-free.app/api/instagram/oauth/callback`
    }

    return window.location.origin + '/api/instagram/oauth/callback'
}

export const IntegrationInstagramButton = ({ appId, organizationId }: Props) => {
    const redirectToInstagramAuth = () => {
        // TODO: Remove this once we have a production URL
        const state = JSON.stringify({ organizationId })

        const authUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${appId}&redirect_uri=${encodeURIComponent(getRedirectURI())}&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights&state=${encodeURIComponent(state)}`

        window.location.href = authUrl
    }

    return (
        <Button variant="outline" onClick={redirectToInstagramAuth}>
            Connect
        </Button>
    )
}
