import axios, { Method } from 'axios'

export const fetch = async <T>(method: Method, url: string, data?: any, headers?: Record<string, string>): Promise<T> => {
    const response = await axios<T>({
        method,
        url: '/api' + url,
        data,
        headers,
    })

    return response.data
}
