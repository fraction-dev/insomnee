import { headers } from 'next/headers'

import { env } from '~/config/env'
import { User } from '~/services/user/model'

interface SessionResponse {
    user: User | null
}

export const withAuth = async (): Promise<{ user: User | null }> => {
    const headersList = await headers()
    const cookie = headersList.get('cookie')

    const session = await fetch(`${env.BASE_URL}/api/auth/get-session`, {
        headers: {
            'Content-Type': 'application/json',
            cookie: cookie ?? '',
        },
    }).then((res) => res.json())

    return { user: mapSessionResponseToUser(session) }
}

const mapSessionResponseToUser = (session: SessionResponse): User | null => {
    if (!session) {
        return null
    }

    if ('user' in session) {
        return session.user as User
    }

    if ('email' in session) {
        return session as User
    }

    return null
}
