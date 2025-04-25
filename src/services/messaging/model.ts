export interface DialogUser {
    id: string
    username: string | null
    avatar: string | null
}

export interface Dialog {
    id: string
    platform: 'instagram' | 'tiktok' | '999' | 'telegram'
    targetUser: DialogUser
    messages: DialogMessage[]
}

export interface DialogMessage {
    id: string
    content: string
    type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'location' | 'sticker' | 'contact' | 'system'
    user: DialogUser
    createdAt: string
    isBot: boolean
}
