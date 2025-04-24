import { env } from '~/config/env'
import {
    InstagramConversation,
    InstagramConversationMessage,
    InstagramLongLivedAccessTokenResponse,
    InstagramShortLivedAccessTokenResponse,
} from './lib'
import { fetchInstagram } from './lib/fetchInstagram'

export const getShortLivedAccessToken = async (code: string) => {
    const response = await fetchInstagram<InstagramShortLivedAccessTokenResponse>(
        'POST',
        '/oauth/access_token',
        {
            client_id: env.INSTAGRAM_APP_ID,
            client_secret: env.INSTAGRAM_APP_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: `${env.BASE_URL}/api/instagram/oauth/callback`,
            code: code,
        },
        { 'Content-Type': 'application/x-www-form-urlencoded' },
    )

    return response
}

export const getLongLivedAccessToken = async (shortLivedAccessToken: string, clientSecret: string) => {
    const response = await fetchInstagram<InstagramLongLivedAccessTokenResponse>(
        'GET',
        `/access_token?grant_type=ig_exchange_token&client_secret=${clientSecret}&access_token=${shortLivedAccessToken}`,
    )

    return response
}

export const getConversations = async (accessToken: string) => {
    const response = await fetchInstagram<InstagramConversation>('GET', `/me/conversations?platform=instagram&access_token=${accessToken}`)

    return response.data
}

export const getConversationMessages = async (accessToken: string, conversationId: string) => {
    const response = await fetchInstagram<InstagramConversationMessage>(
        'GET',
        `/me/conversations/${conversationId}/messages?platform=instagram&access_token=${accessToken}`,
    )

    return response.data
}
