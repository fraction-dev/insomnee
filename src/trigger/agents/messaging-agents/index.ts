import { openai } from '@ai-sdk/openai'
import { task } from '@trigger.dev/sdk/v3'
import { generateObject } from 'ai'
import { z } from 'zod'
import { Dialog } from '~/services/messaging/model'
import { getOrganizationById } from '~/services/organization'
import { logOrganizationAIUsage } from '~/services/organization-ai-usage'
import { bootstrapOrganizationMessagingAgent, updateOrganizationMessagingAgent } from '~/services/organization-messaging-agent'
import { OrganizationMessagingAgentStatus } from '~/services/organization-messaging-agent/model'
import { TriggerTasks } from '~/trigger/types/tasks'
import { MESSAGING_ANALYTICS_PROMPT } from './prompts'

type SocialType = 'INSTAGRAM' | 'FACEBOOK' | 'WHATSAPP' | 'TWITTER' | 'TELEGRAM' | 'SIMPALS'

interface Payload {
    organizationId: string
    integrationId: string
    socialType: SocialType
    websiteUrl: string
    dialogs: Dialog[]
}

const messagingAgentOutputSchema = z.object({
    prompt: z.string(),
})

export const setupMessagingAgentTask = task({
    id: TriggerTasks.SETUP_MESSAGING_AGENT,
    maxDuration: 300, // 5 min
    run: async (payload: Payload) => {
        const { organizationId, integrationId, socialType, websiteUrl, dialogs } = payload

        await getOrganizationById(organizationId) // ensure the organization exists
        const agent = await bootstrapOrganizationMessagingAgent(organizationId, integrationId)

        const output = await generateObject({
            model: openai('gpt-4o'),
            prompt: `
            ${MESSAGING_ANALYTICS_PROMPT}

            Social Type: ${socialType}
            Website URL: ${websiteUrl}
            Dialogs: ${JSON.stringify(dialogs)}
            `,
            schema: messagingAgentOutputSchema,
            schemaDescription: 'The prompt for the messaging agent',
            schemaName: 'messagingAgentOutput',
        })

        await logOrganizationAIUsage({
            organizationId,
            tokens: output.usage.totalTokens,
            description: `Messaging Agent Setup. Prompt: ${output.object.prompt}`,
        })

        await updateOrganizationMessagingAgent(agent.id, {
            status: OrganizationMessagingAgentStatus.ACTIVE,
            prompt: output.object.prompt,
        })

        return output.object
    },
})

export const messagingAgent = async (payload: Payload) => {
    const { socialType, websiteUrl, dialogs } = payload

    switch (socialType) {
        case 'INSTAGRAM':
            const output = await generateObject({
                model: openai('gpt-4o'),
                prompt: MESSAGING_ANALYTICS_PROMPT,
                schema: messagingAgentOutputSchema,
                schemaDescription: 'The prompt for the messaging agent',
                schemaName: 'messagingAgentOutput',
                messages: [
                    {
                        role: 'user',
                        content: MESSAGING_ANALYTICS_PROMPT,
                    },
                    {
                        role: 'user',
                        content: `
                        Social Type: ${socialType}
                        Website URL: ${websiteUrl}
                        Dialogs: ${JSON.stringify(dialogs)}
                        `,
                    },
                ],
            })

            return output.object

        default:
            throw new Error(`Social type ${socialType} is not supported in the messaging agent`)
    }
}
