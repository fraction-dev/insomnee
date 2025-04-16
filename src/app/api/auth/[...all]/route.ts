import { toNextJsHandler } from 'better-auth/next-js'

import { auth } from '~/config/auth'

export const config = { api: { bodyParser: false } }

export const { POST, GET } = toNextJsHandler(auth.handler)
