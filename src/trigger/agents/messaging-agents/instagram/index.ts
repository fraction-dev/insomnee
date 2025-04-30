import { logger, task } from '@trigger.dev/sdk/v3'
import { generateText } from '~/lib/server/ai'
import { sendTextMessage } from '~/lib/server/instagram/api'
import { getInstagramConversations } from '~/services/instagram'
import { OrganizationIntegration } from '~/services/integration/model'
import { getOrganizationById } from '~/services/organization'
import { logOrganizationAIUsage } from '~/services/organization-ai-usage'
import { getOrganizationMessagingAgentByIntegrationId, saveMessagingAgentResponseMessage } from '~/services/organization-messaging-agent'
import { OrganizationMessagingAgentStatus } from '~/services/organization-messaging-agent/model'
import { TriggerTasks } from '~/trigger/types/tasks'
import { INSTAGRAM_MESSAGE_PROMPT } from './prompts'

interface Payload {
    integration: OrganizationIntegration
    message: string
    senderId: string
}

export const triggerInstagramMessageAgentFromWebhookTask = task({
    id: TriggerTasks.TRIGGER_INSTAGRAM_MESSAGE_AGENT_FROM_WEBHOOK,
    maxDuration: 300, // 5 min
    run: async (payload: Payload) => {
        logger.info('Triggering instagram message agent from webhook', {
            payload,
        })

        const { integration, message, senderId } = payload

        const agent = await getOrganizationMessagingAgentByIntegrationId(integration.id)
        if (!agent) {
            logger.error('No agent found for the integration id', {
                integrationId: integration.id,
            })

            throw new Error('No agent found for the integration id')
        }

        const organization = await getOrganizationById(integration.organizationId)
        const allConversations = await getInstagramConversations(integration.organizationId)
        const conversation = allConversations.find((conversation) => conversation.targetUser.id === senderId)

        if (!conversation) {
            logger.error('No conversation found for the sender id', {
                senderId,
            })

            throw new Error('No conversation found for the sender id')
        }

        const isPromptSet = agent.prompt.trim() !== ''
        const isBotEnabled = integration.instagramIntegration?.configuration?.isBotEnabled ?? false
        const isAgentReady = agent.status === OrganizationMessagingAgentStatus.ACTIVE
        const accessToken = integration.instagramIntegration?.accessToken

        if (isAgentReady && isBotEnabled && isPromptSet && accessToken) {
            const { text: prompt, totalTokens } = await generateText({
                model: 'gpt-4o',
                tools: [{ type: 'web_search_preview_2025_03_11' }],
                messages: [
                    {
                        role: 'user',
                        content: `
                        [1] Prompt: ${INSTAGRAM_MESSAGE_PROMPT}
                        [2] Old conversation: ${conversation.messages.length > 0 ? JSON.stringify(conversation.messages) : 'No old conversation. It is a new customer.'}
                        [3] Additional instructions: ${agent.prompt}
                        [4] Organization website: ${organization.websiteUrl}

                        Customer message: ${message}
                        `,
                    },
                ],
            })

            await logOrganizationAIUsage({
                organizationId: integration.organizationId,
                tokens: totalTokens,
                description: `Instagram Message Agent Execution. Output message: ${prompt}`,
            })

            await saveMessagingAgentResponseMessage(integration.organizationId, conversation.id, prompt)

            await sendTextMessage(accessToken, {
                recipientId: senderId,
                message: prompt,
            })
        }
    },
})
