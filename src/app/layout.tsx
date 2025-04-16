import '~/app/styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { RootProvider } from '~/core/providers'
import { detectLanguage } from '~/i18n/detect-language'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
    title: 'Insomnee - Manage your business life 24/7',
    description: 'Insomnee is a platform that helps you manage your business life 24/7',
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const language = await detectLanguage()

    return (
        <html lang={language}>
            <body className={inter.className}>
                <RootProvider language={language}>{children}</RootProvider>
            </body>
        </html>
    )
}
