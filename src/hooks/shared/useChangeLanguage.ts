'use client'

import 'client-only'

import { useRouter } from 'next/navigation'
import { useCallback, useContext } from 'react'
import { I18nContext } from 'react-i18next'

export const useChangeLanguage = () => {
    const { i18n } = useContext(I18nContext)
    const currentLanguage = i18n.language
    const router = useRouter()
    const changeLanguage = useCallback(
        async (lang: string) => {
            if (lang !== currentLanguage) {
                await i18n.changeLanguage(lang)
                router.refresh()
            }
        },
        [i18n, currentLanguage, router],
    )

    return { changeLanguage, currentLanguage }
}
