export interface UserChat {
    id: string
    title: string
    userId: string
    messages: ChatMessage[]
    createdAt: Date
    updatedAt: Date
}

export type ChatMessage = {
    role: ChatRole
    content: string
}

export type ChatRole = 'user' | 'assistant' | 'system'

export type UserChatCreatePayload = Pick<UserChat, 'userId' | 'messages' | 'title' | 'id'>
