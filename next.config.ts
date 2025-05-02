import type { NextConfig } from 'next'
import { i18n } from './next-i18next.config'

const nextConfig: NextConfig = {
    /* config options here */
    i18n,
    images: {
        remotePatterns: [
            {
                hostname: '**',
            },
        ],
    },
    optimizePackageImports: ['@prisma/client'],
}

export default nextConfig
