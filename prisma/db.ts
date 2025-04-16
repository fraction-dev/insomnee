import { PrismaClient as _PrismaClient } from '@prisma/client'
import * as runtime from '@prisma/client/runtime/library'

import { env } from '~/config/env'

// Defines prisma globally to not exhaust multiple connections to the database
// See https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
declare global {
    // allow global `var` declarations
    // eslint-disable-next-line no-var
    var prisma: _PrismaClient | undefined
}

export const prisma = global.prisma || new _PrismaClient()
export type PrismaClient = Omit<_PrismaClient, runtime.ITXClientDenyList>

if (env.NODE_ENV !== 'production') {
    global.prisma = prisma
}
