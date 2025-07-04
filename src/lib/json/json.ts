import { InternalServerErrorException } from '~/core/exception'
import logger from '~/core/logger'

export const safeJsonStringify = (data: unknown): string => {
    try {
        return JSON.stringify(data)
    } catch (error) {
        throw new InternalServerErrorException(`Failed to stringify data: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}

export const safeJsonParse = <T>(jsonString: string | null, fallback: T): T => {
    if (!jsonString) return fallback
    try {
        return JSON.parse(jsonString) as T
    } catch (error) {
        logger.warn('Failed to parse JSON:', { error })
        return fallback
    }
}
