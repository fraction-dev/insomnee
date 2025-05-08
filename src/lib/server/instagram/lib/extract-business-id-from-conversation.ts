import _ from 'lodash'

import { Dialog } from '~/services/messaging/model'

export const extractBusinessIdFromConversations = (username: string, conversations: Dialog[]): string | null => {
    // Check target users first (faster since it's a smaller collection)
    const targetUserMatch = _.find(conversations, (conv) => conv.targetUser.username === username)
    if (targetUserMatch) {
        return targetUserMatch.targetUser.id
    }

    // If not found in target users, check messages
    // Use flatMap to flatten the nested message arrays
    const messages = _.flatMap(conversations, (conv) => conv.messages)

    // Find first message with matching username
    const messageMatch = _.find(messages, (msg) => msg.user.username === username)
    return messageMatch?.user.id || null
}
