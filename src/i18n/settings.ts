import { InitOptions } from 'i18next'

export const fallbackLanguage = 'en'
export const languages = [fallbackLanguage, 'ro', 'ru', 'ua']
export const defaultNS = 'common'

export type ExtraInitOptions = {
    // Escape passed in values to avoid xss injection
    escapeValue?: boolean // default: true
}

export const NAMESPACES = ['common', 'auth']

export function getCommonI18nextOptions(
    language = fallbackLanguage,
    ns: string | string[] = defaultNS,
    extraOptions?: ExtraInitOptions,
): InitOptions {
    return {
        supportedLngs: languages,
        fallbackLng: process.env.NODE_ENV === 'development' ? false : fallbackLanguage,
        lng: language,
        fallbackNS: defaultNS,
        defaultNS,
        appendNamespaceToMissingKey: true,
        ns,
        missingKeyNoValueFallbackToKey: process.env.NODE_ENV === 'development',
        returnEmptyString: true,
        keySeparator: false,
        interpolation: {
            escapeValue: extraOptions?.escapeValue ?? true,
        },
        load: 'languageOnly',
        preload: [fallbackLanguage],
        partialBundledLanguages: true,
        nonExplicitSupportedLngs: false,
        saveMissing: true,
        missingKeyHandler: (lng, ns, key) => {
            const payload = { key, namespace: ns, language: lng }
            if (process.env.NODE_ENV === 'development') {
                // eslint-disable-next-line no-console
                console.warn('Missing translation', payload)
            }
        },
    }
}
