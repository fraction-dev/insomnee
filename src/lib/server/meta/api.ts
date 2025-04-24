import axios from 'axios'

import { env } from '~/config/env'
import logger from '~/core/logger'
import { InternalError } from '~/lib/operational-errors'

export const exchangeCodeForToken = async (code: string) => {
    try {
        const response = await axios.post('https://api.instagram.com/oauth/access_token', {
            client_id: env.INSTAGRAM_APP_ID,
            client_secret: env.INSTAGRAM_APP_SECRET,
            code,
            redirect_uri: `${env.BASE_URL}/api/instagram/access-token`,
            grant_type: 'authorization_code',
        })

        return response.data
    } catch (error: any) {
        logger.error(`[exchangeCodeForToken] Error exchanging code for token: ${error?.message}`)
        throw new InternalError('Failed to exchange code for token')
    }
}
