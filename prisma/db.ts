import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient as _PrismaClient } from '@prisma/client'
import * as runtime from '@prisma/client/runtime/library'
import ws from 'ws'

import { env } from '~/config/env'

// Defines prisma globally to not exhaust multiple connections to the datbase
// See https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
declare global {
    // allow global `var` declarations

    var prisma: _PrismaClient | undefined
}

let prisma: _PrismaClient

if (env.NODE_ENV === 'production' && process.env.CI !== 'true') {
    // Configure Neon to use ws
    neonConfig.webSocketConstructor = ws

    const createNeonPrismaClient = () => {
        const adapter = new PrismaNeon({
            connectionString: env.DATABASE_URL,
        })

        return new _PrismaClient({
            // @ts-ignore
            adapter,
        })
    }

    prisma = createNeonPrismaClient()
} else {
    prisma = global.prisma || new _PrismaClient()
}

if (env.NODE_ENV !== 'production') {
    global.prisma = prisma
}

export { prisma }
export type PrismaClient = Omit<_PrismaClient, runtime.ITXClientDenyList>
