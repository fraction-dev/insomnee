'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import * as React from 'react'

export function ThemeProvider({ children }: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider defaultTheme="light" enableSystem={false}>
            {children}
        </NextThemesProvider>
    )
}
