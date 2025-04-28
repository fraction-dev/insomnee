import axios, { Method } from 'axios'
import logger from '~/core/logger'
import { InternalError } from '~/lib/operational-errors'

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

class InstagramError extends Error {
    constructor(
        message: string,
        public error: InstagramErrorResponse,
    ) {
        super(message)
    }

    getError() {
        return this.error
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

        logger.error(`[fetchInstagram] Instagram error`, {
            url,
            method,
            error: {
                message: err.response?.data?.error?.message ?? 'Error fetching Instagram API',
            },
        })

        throw new InternalError(err.response?.data?.error?.message ?? 'Error fetching Instagram API')
    }
}
