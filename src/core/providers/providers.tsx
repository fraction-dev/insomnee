import { PropsWithChildren } from 'react'

import { I18nProvider } from '~/i18n/i18n-provider'

import { QueryProvider } from './query-provider'
import { ThemeProvider } from './theme-provider'

export const RootProvider = ({ children, language }: PropsWithChildren<{ language: string }>) => {
    return (
        <QueryProvider>
            <ThemeProvider>
                <I18nProvider language={language}>{children}</I18nProvider>
            </ThemeProvider>
        </QueryProvider>
    )
}
