import { task } from '@trigger.dev/sdk/v3'

import logger from '~/core/logger'
import { generateText } from '~/lib/server/ai/lib/generate-text'
import { sendTextMessage } from '~/lib/server/instagram/api'
import { getInstagramConversations } from '~/services/instagram'
import { OrganizationIntegration } from '~/services/integration/model'
import { getOrganizationById } from '~/services/organization'
import { logOrganizationAIUsage } from '~/services/organization-ai-usage'
import { getOrganizationMessagingAgentByIntegrationId, saveMessagingAgentResponseMessage } from '~/services/organization-messaging-agent'
import { getOrganizationProductsAndServices } from '~/services/organization-products-and-services'
import { TriggerTasks } from '~/trigger/types/tasks'

import { INSTAGRAM_MESSAGE_GENERATION_ASSISTANT_PROMPT } from './consts'

interface Payload {
    integration: OrganizationIntegration
    message: string
    senderId: string
}

export const executeInstagramMessageTask = task({
    id: TriggerTasks.EXECUTE_INSTAGRAM_MESSAGE,
    maxDuration: 300, // 5 min
    run: async (payload: Payload) => {
        const { integration, message, senderId } = payload

        const [agent, organization, allConversations, productsAndServices] = await Promise.all([
            getOrganizationMessagingAgentByIntegrationId(integration.id),
            getOrganizationById(integration.organizationId),
            getInstagramConversations(integration.organizationId),
            getOrganizationProductsAndServices(integration.organizationId),
        ])

        const conversation = allConversations.find((conversation) => conversation.targetUser.id === senderId)
        if (!conversation) {
            logger.warn('No conversation found for the sender id', { senderId })
            return
        }

        /**
         * Execute the message response generation
         */
        const isAgentReady = agent.status === 'ACTIVE'
        const isBotEnabled = integration.instagramIntegration?.configuration?.isBotEnabled ?? false
        const accessToken = integration.instagramIntegration?.accessToken
        const hasAccessToProductsAndServices = agent.hasAccessToProductsAndServices

        const isReadyToExecute = isAgentReady && isBotEnabled && accessToken
        if (isReadyToExecute) {
            const { text: generateMessage, totalTokens } = await generateText({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'assistant',
                        content: INSTAGRAM_MESSAGE_GENERATION_ASSISTANT_PROMPT({
                            previousConversations: conversation.messages,
                            organization,
                            productsAndServices: hasAccessToProductsAndServices ? productsAndServices : [],
                            rules: agent.prompt,
                        }),
                    },
                    {
                        role: 'user',
                        content: message,
                    },
                ],
            })

            /**
             * Post-execution actions
             */
            await Promise.all([
                logOrganizationAIUsage({
                    organizationId: integration.organizationId,
                    tokens: totalTokens,
                    description: `Instagram Message Agent Execution. Output message: ${generateMessage}`,
                }),
                sendTextMessage(accessToken, { recipientId: senderId, message: generateMessage }),
                saveMessagingAgentResponseMessage(integration.organizationId, conversation.id, generateMessage),
            ])
        }
    },
    onFailure: async (error) => {
        logger.error('Failed to execute Instagram message', { error })
    },
})
