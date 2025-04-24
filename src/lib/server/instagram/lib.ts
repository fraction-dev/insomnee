export interface BaseInstagramResponse<T> {
    data: T[]
}

export type InstagramConversation = BaseInstagramResponse<Array<{ id: string; updated_time: string }>>

export interface InstagramShortLivedAccessTokenResponse {
    access_token: string
    user_id: string
}

export interface InstagramLongLivedAccessTokenResponse {
    access_token: string
    token_type: 'Bearer'
    expires_in: number
}

export type InstagramConversationMessage = BaseInstagramResponse<Array<{ id: string; created_time: string }> & { id: string }>
