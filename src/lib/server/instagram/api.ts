import axios from 'axios'
import { env } from '~/config/env'
import logger from '~/core/logger'

export const getAccessTokenByCode = async (
    code: string,
): Promise<{
    access_token: string
    user_id: string
}> => {
    try {
        const response = await axios.post(
            'https://api.instagram.com/oauth/access_token',
            {
                client_id: env.INSTAGRAM_APP_ID,
                client_secret: env.INSTAGRAM_APP_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: `${env.NGROK_URL}/api/instagram/oauth/callback`,
                code: code,
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        )
        return response.data
    } catch (error) {
        logger.error(`[getAccessTokenByCode] Error fetching access token: ${error}`)
        throw error
    }
}

export const getUserProfile = async (accessToken: string) => {
    try {
        const response = await axios.get('https://graph.instagram.com/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                fields: 'id,username,profile_picture_url,account_type,followers_count,follows_count,media_count',
            },
        })
        return response.data
    } catch (error) {
        logger.error(`[getUserProfile] Error fetching user profile: ${error}`)
        throw error
    }
}
