import { env } from '~/config/env'

import { fetchInstagram } from './lib/fetch-instagram'
import {
    InstagramConversation,
    InstagramConversationMessage,
    InstagramConversationMessageEntity,
    InstagramLongLivedAccessTokenResponse,
    InstagramShortLivedAccessTokenResponse,
    InstagramUser,
} from './model'

export const getInstagramUserById = async (accessToken: string, userId: string) => {
    return await fetchInstagram<InstagramUser>('GET', `/${userId}?fields=username&access_token=${accessToken}`)
}

export const getShortLivedAccessToken = async (code: string) => {
    const response = await fetchInstagram<InstagramShortLivedAccessTokenResponse>(
        'POST',
        '/oauth/access_token',
        {
            client_id: env.INSTAGRAM_APP_ID,
            client_secret: env.INSTAGRAM_APP_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: env.INSTAGRAM_CALLBACK_URL,
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
        `/${conversationId}?fields=messages&access_token=${accessToken}`,
    )

    return response
}

export const getConversationMessage = async (accessToken: string, messageId: string) => {
    return await fetchInstagram<InstagramConversationMessageEntity>(
        'GET',
        `/${messageId}?fields=id,created_time,from,to,message&access_token=${accessToken}`,
    )
}

export const sendTextMessage = async (accessToken: string, payload: { recipientId: string; message: string }) => {
    return await fetchInstagram<InstagramConversationMessageEntity>('POST', `/me/messages?access_token=${accessToken}`, {
        recipient: { id: payload.recipientId },
        message: { text: payload.message },
    })
}

export const getMe = async (accessToken: string, userId: string) => {
    const fields = ['id', 'username', 'profile_picture_url', 'name', 'biography', 'website']
    return await fetchInstagram<{
        id: string
        username?: string
        profile_picture_url?: string
        name?: string
        biography?: string
        website?: string
    }>('GET', `/${userId}?fields=${fields.join(',')}&access_token=${accessToken}`)
}

export const getUserById = async (accessToken: string, userId: string) => {
    return await fetchInstagram<InstagramUser>('GET', `/${userId}?access_token=${accessToken}`)
}
