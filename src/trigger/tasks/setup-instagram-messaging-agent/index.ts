// import { openai } from '@ai-sdk/openai'
// import { logger, task } from '@trigger.dev/sdk/v3'
// import { generateText } from 'ai'

// import { perplexity } from '~/lib/server/ai'
// import { logOrganizationAIUsage } from '~/services/ai-usage'
// import { Integration } from '~/services/integration/model'
// import { bootstrapOrganizationMessagingAgent, updateOrganizationMessagingAgent } from '~/services/messaging-agent'
// import { getOrganizationById } from '~/services/organization'
// import { Organization } from '~/services/organization/model'
// import { TriggerTasks } from '~/trigger/types/tasks'

// import { OPENAI_BUILD_MESSAGING_AGENT_PROMPT, OPENAI_WEBSITE_SUMMARY_PROMPT, PERPLEXITY_WEBSITE_DETAILS_PROMPT } from './consts'

// interface Payload {
//     organization: Organization
//     integration: Integration
// }

// export const setupInstagramMessagingTaskAgent = task({
//     id: TriggerTasks.SETUP_INSTAGRAM_MESSAGING_TASK_AGENT,
//     maxDuration: 300, // 5 min
//     run: async (payload: Payload) => {
//         const { organization, integration } = payload

//         await getOrganizationById(organization.id) // ensure the organization exists

//         /**
//          * Bootstrap the agent with pending status
//          */
//         const agent = await bootstrapOrganizationMessagingAgent(organization.id, integration.id)

//         try {
//             /**
//              * Extract the website main content
//              */
//             const {
//                 text: websiteContent,
//                 usage: { totalTokens: websiteContentTotalTokens },
//             } = await generateText({
//                 model: perplexity('sonar-pro'),
//                 prompt: PERPLEXITY_WEBSITE_DETAILS_PROMPT(organization.websiteUrl),
//             })

//             /**
//              * Summarize the website content
//              */
//             const {
//                 text: websiteSummary,
//                 usage: { totalTokens: websiteSummaryTotalTokens },
//             } = await generateText({
//                 model: openai('gpt-4o'),
//                 prompt: OPENAI_WEBSITE_SUMMARY_PROMPT(websiteContent),
//             })

//             /**
//              * Build the messaging agent prompt
//              */
//             const {
//                 text: messagingAgentPrompt,
//                 usage: { totalTokens: messagingAgentTotalTokens },
//             } = await generateText({
//                 model: openai('gpt-4o'),
//                 prompt: OPENAI_BUILD_MESSAGING_AGENT_PROMPT(websiteSummary, organization.defaultLanguage),
//             })

//             /**
//              * Log the usage
//              */
//             const totalTokens = messagingAgentTotalTokens + websiteSummaryTotalTokens + websiteContentTotalTokens
//             await logOrganizationAIUsage({
//                 organizationId: organization.id,
//                 tokens: totalTokens,
//                 description: `Setup Instagram Messaging Agent. Prompt: ${messagingAgentPrompt}`,
//             })

//             /**
//              * Update the agent status
//              */
//             await updateOrganizationMessagingAgent(agent.id, organization.id, {
//                 status: 'ACTIVE',
//                 prompt: messagingAgentPrompt ?? '',
//             })

//             return {
//                 websiteSummary,
//                 websiteContent,
//                 messagingAgentPrompt,
//                 totalTokens,
//             }
//         } catch (error) {
//             logger.error('Error setting up Instagram messaging agent', {
//                 error,
//                 organizationId: organization.id,
//                 integrationId: integration.id,
//             })

//             await updateOrganizationMessagingAgent(agent.id, organization.id, {
//                 status: 'ERROR',
//             })

//             throw error
//         }
//     },
//     onFailure: async (error) => {
//         logger.error('Error setting up Instagram messaging agent', { error })
//     },
// })
