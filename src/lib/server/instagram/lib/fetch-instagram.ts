import axios, { Method } from 'axios'

import logger from '~/core/logger'
import { InternalError } from '~/lib/shared/operational-errors'

interface InstagramErrorResponse {
    response: {
        data: {
            error: {
                message: string
                type: string
                code: number
                error_subcode?: number
                error_user_title?: string
                error_user_msg?: string
            }
        }
    }
}

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
        const err = error as InstagramErrorResponse

        const errorMessage = err.response?.data?.error?.message ?? 'Error fetching Instagram API'

        logger.error(`Failed to fetch Instagram API`, {
            url,
            method,
            error,
            errorMessage,
        })

        throw new InternalError(errorMessage)
    }
}
