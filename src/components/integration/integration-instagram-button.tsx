'use client'

import { Button } from '../ui/button'

interface Props {
    appId: string
    organizationId: string
}

export const IntegrationInstagramButton = ({ appId, organizationId }: Props) => {
    const redirectToInstagramAuth = () => {
        const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/instagram/oauth/callback`
        const state = JSON.stringify({ organizationId })

        const authUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights&state=${encodeURIComponent(state)}`

        window.location.href = authUrl
    }

    return (
        <Button variant="outline" onClick={redirectToInstagramAuth}>
            Connect
        </Button>
    )
}
