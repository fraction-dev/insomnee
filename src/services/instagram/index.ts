import { flatten, union } from 'lodash'

import {
    getConversationMessage,
    getConversationMessages,
    getConversations,
    getInstagramUserById,
    getUserById,
} from '~/lib/server/instagram/api'
import { InstagramConversationMessageEntity, InstagramUser } from '~/lib/server/instagram/model'

import { getInstagramIntegrationByOrganizationId } from '../integration'
import { Dialog, DialogMessage, DialogUser } from '../messaging/model'
import { InstagramAccessTokenNotFoundError } from './errors'

export const getInstagramConversations = async (organizationId: string): Promise<Dialog[]> => {
    const { instagramIntegration: integration } = await getInstagramIntegrationByOrganizationId(organizationId)

    if (!integration?.accessToken) {
        throw InstagramAccessTokenNotFoundError(organizationId)
    }

    const { username } = await getInstagramUserById(integration.accessToken, integration.instagramUserId)

    const conversations = await getConversations(integration.accessToken)
    const conversationDialogs = await Promise.all(
        conversations.map(async (conversation) => {
            const messages = await getConversationMessages(integration.accessToken, conversation.id)
            return messages.messages.data
        }),
    )

    const conversationMessages = flatten(
        await Promise.all(
            conversationDialogs
                .flatMap(async (dialog) => {
                    const messages = await Promise.all(
                        dialog.flatMap(async (message) => {
                            const messageEntity = await getConversationMessage(integration.accessToken, message.id)
                            return messageEntity
                        }),
                    )

                    return messages
                })
                .flat(),
        ),
    )

    const userIds = union(conversationMessages.map((message) => message.from.id))
    const users = await Promise.all(userIds.map((userId) => getUserById(integration.accessToken, userId)))

    const dialogs = transformInstagramData(conversationMessages, username)
    const dialogsWithProfilePics = formatDialogsWithProfilePics(dialogs, users)
    return dialogsWithProfilePics
}

const transformInstagramData = (conversationMessages: InstagramConversationMessageEntity[], username: string): Dialog[] => {
    if (!Array.isArray(conversationMessages) || conversationMessages.length === 0) {
        return []
    }

    // Get the bot user ID
    const botUser = conversationMessages.find(
        (message) =>
            message.from.username === username ||
            (message.to && message.to.data && message.to.data.find((user) => user.username === username)),
    )

    const ownerUserId =
        botUser?.from.username === username ? botUser.from.id : botUser?.to?.data?.find((user) => user.username === username)?.id

    if (!ownerUserId) return []

    // Create a map of conversations grouped by unique users
    const conversationsByUser = new Map<
        string,
        {
            userId: string
            username: string
            messages: InstagramConversationMessageEntity[]
        }
    >()

    // Group messages by conversation partner
    conversationMessages.forEach((message) => {
        let partnerId: string | undefined
        let partnerUsername: string | undefined

        // If bot is sender, get recipient
        if (message.from.id === ownerUserId) {
            if (message.to && message.to.data && message.to.data.length > 0) {
                const recipient = message.to.data[0]
                partnerId = recipient.id
                partnerUsername = recipient.username
            }
        }
        // If bot is recipient, get sender
        else if (
            message.to &&
            ((typeof message.to === 'object' && message.to.data && message.to.data.some((user) => user.id === ownerUserId)) ||
                (typeof message.to === 'object' && message.to.data && message.to.data.some((user) => user.username === username)))
        ) {
            partnerId = message.from.id
            partnerUsername = message.from.username
        }
        // If message is from one user to another (neither being the bot), skip
        else if (
            message.from.id !== ownerUserId &&
            (!message.to || !message.to.data || !message.to.data.some((user) => user.id === ownerUserId))
        ) {
            return
        }

        if (partnerId && partnerUsername) {
            if (!conversationsByUser.has(partnerId)) {
                conversationsByUser.set(partnerId, {
                    userId: partnerId,
                    username: partnerUsername,
                    messages: [],
                })
            }
            conversationsByUser.get(partnerId)!.messages.push(message)
        }
    })

    // Transform each conversation into a Dialog
    return Array.from(conversationsByUser.values()).map((conversation) => {
        const targetUser: DialogUser = {
            id: conversation.userId,
            username: conversation.username,
            avatar: null,
        }

        const botUserInfo: DialogUser = {
            id: ownerUserId,
            username: username,
            avatar: null,
        }

        const messages: DialogMessage[] = conversation.messages.map((message) => {
            const isFromBot = message.from.id === ownerUserId

            return {
                id: message.id,
                content: message.message,
                type: 'text',
                user: isFromBot ? botUserInfo : targetUser,
                createdAt: message.created_time,
                isBot: false,
            }
        })

        // Sort messages by creation time
        const sortedMessages = messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

        return {
            id: `${conversation.userId}`,
            platform: 'instagram',
            targetUser,
            messages: sortedMessages,
        }
    })
}

const formatDialogsWithProfilePics = (dialogs: Dialog[], users: InstagramUser[]) => {
    return dialogs.map((dialog) => {
        const user = users.find((user) => user.id === dialog.targetUser.id)
        return {
            ...dialog,
            targetUser: {
                ...dialog.targetUser,
                avatar: user?.profile_pic ?? null,
            },
        }
    })
}
