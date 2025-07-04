import axios, { AxiosError, Method } from 'axios'

import { env } from '~/config/env'
import { InternalServerErrorException } from '~/core/exception'
import logger from '~/core/logger'

export const fetchLeadsGenerationAgent = async <T>(method: Method, url: string, data?: any, headers?: any) => {
    try {
        const response = await axios<T>({
            method,
            url: env.LEADS_GENERATION_AGENT_URL + url,
            data,
            headers,
        })

        return response.data
    } catch (error) {
        logger.error(`Failed to fetch leads generation agent`, { error })

        if (error instanceof AxiosError) {
            throw new InternalServerErrorException(error.response?.data.message)
        }

        throw error
    }
}
