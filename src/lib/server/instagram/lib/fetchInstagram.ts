import axios, { Method } from 'axios'
import logger from '~/core/logger'
import { InternalError } from '~/lib/operational-errors'

export const fetchInstagram = async <T>(method: Method, url: string, data?: any, headers?: Record<string, string>): Promise<T> => {
    const baseUrl = url === '/oauth/access_token' ? 'https://api.instagram.com' : 'https://graph.instagram.com/v22.0'

    try {
        const response = await axios({
            method,
            url: baseUrl + url,
            data,
            headers,
        })

        return response.data
    } catch (error) {
        logger.error(`[fetchInstagram] Error fetching Instagram API`, {
            url,
            method,
            data,
            headers,
            error,
        })
        throw new InternalError('Error fetching Instagram API')
    }
}
