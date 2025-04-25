export interface BaseInstagramResponse<T> {
    data: T[]
}

export type InstagramConversation = {
    data: Array<{ id: string; updated_time: string }>
}

export interface InstagramUser {
    id: string
    username: string
}

export interface InstagramShortLivedAccessTokenResponse {
    access_token: string
    user_id: string
}

export interface InstagramLongLivedAccessTokenResponse {
    access_token: string
    token_type: 'Bearer'
    expires_in: number
}

export type InstagramConversationMessage = {
    messages: {
        data: Array<{ id: string; created_time: string; is_unsupported: boolean }>
    }
    paging: {
        cursors: { after: string; before: string }
        next: string
    }
}

export interface InstagramConversationMessageEntity {
    id: string
    created_time: string
    from: { id: string; username: string }
    to: {
        data: {
            id: string
            username: string
        }[]
    }
    message: string
}
