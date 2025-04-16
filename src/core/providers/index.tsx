import { PropsWithChildren } from 'react'

import { I18nProvider } from '~/i18n/i18n-provider'

export const RootProvider = ({ children, language }: PropsWithChildren<{ language: string }>) => {
    return <I18nProvider language={language}>{children}</I18nProvider>
}
