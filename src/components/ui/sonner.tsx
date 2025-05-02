'use client'

import { AlertTriangle, CheckCircle, Info, Loader, XCircle } from 'lucide-react'
import { useTheme } from 'next-themes'
import { CSSProperties } from 'react'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = 'system' } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps['theme']}
            className="toaster group"
            style={
                {
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                } as CSSProperties
            }
            toastOptions={{
                classNames: {
                    toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toast]:rounded-xs',
                    description: 'group-[.toast]:text-muted-foreground',
                    icon: 'group-data-[type=error]:text-red-500 group-data-[type=success]:text-green-500 group-data-[type=warning]:text-amber-500 group-data-[type=info]:text-blue-500',
                },
            }}
            icons={{
                success: <CheckCircle className="h-4 w-4 text-green-500" />,
                info: <Info className="h-4 w-4 text-blue-500" />,
                warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
                error: <XCircle className="h-4 w-4 text-red-500" />,
                loading: <Loader className="h-4 w-4 text-gray-500 animate-spin" />,
            }}
            {...props}
        />
    )
}

export { Toaster }
