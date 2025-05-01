import * as UserChatDB from 'prisma/services/user-chat'

import { UserChatCreatePayload } from './model'

export const createUserChat = async (payload: UserChatCreatePayload) => {
    return UserChatDB.createUserChat(payload)
}

export const getUserChats = async (userId: string) => {
    return UserChatDB.getUserChats(userId)
}
