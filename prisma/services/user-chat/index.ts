import { UserChat as PrismaUserChat } from '@prisma/client'
import { generateId } from 'ai'
import { prisma } from 'prisma/db'
import { ChatMessage, UserChat, UserChatCreatePayload } from '~/services/user-chat/model'

export const createUserChat = async (payload: UserChatCreatePayload) => {
    const { userId, messages, title, id } = payload

    const created = await prisma.userChat.upsert({
        where: { id },
        create: {
            id: id || generateId(),
            messages,
            userId,
            title,
        },
        update: {
            messages,
        },
    })

    return mapPrismaToUserChat(created)
}

export const getUserChats = async (userId: string) => {
    const chats = await prisma.userChat.findMany({
        where: { userId },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return chats.map(mapPrismaToUserChat)
}

export const mapPrismaToUserChat = (chat: PrismaUserChat): UserChat => {
    return {
        id: chat.id,
        userId: chat.userId,
        messages: chat.messages as ChatMessage[],
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
        title: chat.title,
    }
}
