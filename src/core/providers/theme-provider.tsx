'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import * as React from 'react'

export function ThemeProvider({ children }: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider enableSystem disableTransitionOnChange defaultTheme="light" attribute="class">
            {children}
        </NextThemesProvider>
    )
}
