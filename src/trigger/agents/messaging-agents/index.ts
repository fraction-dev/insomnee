import { task } from '@trigger.dev/sdk/v3'

import { generateText } from '~/lib/server/ai'
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

export const setupMessagingAgentTask = task({
    id: TriggerTasks.SETUP_MESSAGING_AGENT,
    maxDuration: 300, // 5 min
    run: async (payload: Payload) => {
        const { organizationId, integrationId, socialType, websiteUrl, dialogs } = payload

        await getOrganizationById(organizationId) // ensure the organization exists
        const agent = await bootstrapOrganizationMessagingAgent(organizationId, integrationId)

        const { text: prompt, totalTokens } = await generateText({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
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

        await logOrganizationAIUsage({
            organizationId,
            tokens: totalTokens,
            description: `Messaging Agent Setup. Prompt: ${prompt}`,
        })

        await updateOrganizationMessagingAgent(agent.id, {
            status: OrganizationMessagingAgentStatus.ACTIVE,
            prompt: prompt ?? '',
        })

        return { prompt }
    },
})
