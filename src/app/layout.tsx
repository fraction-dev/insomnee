import '~/app/styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import { Toaster } from '~/components/ui/sonner'
import { RootProvider } from '~/core/providers/providers'
import { detectLanguage } from '~/i18n/detect-language'

const inter = Inter({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export const metadata: Metadata = {
    title: 'Insomnee - Manage your business life 24/7',
    description: 'Insomnee is a platform that helps you manage your business life 24/7',
    icons: {
        icon: '../favicon.ico',
    },
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    const language = await detectLanguage()

    return (
        <html lang={language}>
            <body className={inter.className}>
                <RootProvider language={language}>
                    {children}
                    <Toaster />
                </RootProvider>
            </body>
        </html>
    )
}
