import { logger, task } from '@trigger.dev/sdk/v3'
import { openai as openaiClient } from '~/lib/server/ai'
import { sendTextMessage } from '~/lib/server/instagram/api'
import { getInstagramConversations } from '~/services/instagram'
import { OrganizationIntegration } from '~/services/integration/model'
import { getOrganizationById } from '~/services/organization'
import { logOrganizationAIUsage } from '~/services/organization-ai-usage'
import { getOrganizationMessagingAgentByIntegrationId } from '~/services/organization-messaging-agent'
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
    run: async (payload: Payload, { ctx }) => {
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

        console.log({ conversation })

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
            const responseOutput = await openaiClient.responses.create({
                model: 'gpt-4.1',
                tools: [
                    {
                        type: 'web_search_preview_2025_03_11',
                        search_context_size: 'high',
                    },
                ],
                input: `
                [1] Prompt: ${INSTAGRAM_MESSAGE_PROMPT}
                [2] Old conversation: ${conversation.messages.length > 0 ? JSON.stringify(conversation.messages) : 'No old conversation. It is a new customer.'}
                [3] Additional instructions: ${agent.prompt}
                [4] Organization website: ${organization.websiteUrl}

                Customer message: ${message}
                `,
            })

            const usage = responseOutput.usage?.total_tokens
            const response = responseOutput.output_text

            // const output = await generateObject({
            //     model: openai('gpt-4o'),
            //     prompt: `
            //     [1] Prompt: ${INSTAGRAM_MESSAGE_PROMPT}
            //     [2] Old conversation: ${conversation.messages.length > 0 ? JSON.stringify(conversation.messages) : 'No old conversation. It is a new customer.'}
            //     [3] Additional instructions: ${agent.prompt}
            //     [4] Organization website: ${organization.websiteUrl}

            //     Customer message: ${message}
            //     `,
            //     schema: z.object({
            //         response: z.string(),
            //     }),
            //     schemaName: 'instagramMessageAgentOutput',
            //     schemaDescription: 'The response from the instagram message agent',
            //     maxTokens: 500,
            // })

            await logOrganizationAIUsage({
                organizationId: integration.organizationId,
                tokens: usage ?? 0,
                description: `Instagram Message Agent Execution. Output message: ${response}`,
            })

            await sendTextMessage(accessToken, {
                recipientId: senderId,
                message: response,
            })
        }
    },
})
