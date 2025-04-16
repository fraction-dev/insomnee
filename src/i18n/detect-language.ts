import 'server-only'

import acceptLanguage from 'accept-language'
import { cookies, headers } from 'next/headers'

import logger from '~/core/logger'
import { fallbackLanguage, languages } from '~/i18n/settings'

acceptLanguage.languages(languages)

const LANGUAGE_COOKIE = 'i18next'

export const detectLanguage = async () => {
    try {
        const cookieStore = await cookies()
        const headersList = await headers()

        // Check cookie first (fastest)
        const cookieLang = cookieStore.get(LANGUAGE_COOKIE)?.value
        if (cookieLang && languages.includes(cookieLang)) {
            return cookieLang
        }

        // Then check Accept-Language header

        const acceptLang = headersList.get('Accept-Language')
        if (acceptLang) {
            const detectedLang = acceptLanguage.get(acceptLang)
            if (detectedLang && languages.includes(detectedLang)) {
                return detectedLang
            }
        }

        return fallbackLanguage
    } catch (error) {
        logger.error('Language detection failed:', { error })
        return fallbackLanguage
    }
}
