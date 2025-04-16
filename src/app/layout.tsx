import '~/app/styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
    title: 'Insomnee - Manage your business life 24/7',
    description: 'Insomnee is a platform that helps you manage your business life 24/7',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
