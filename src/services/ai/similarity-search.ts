import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { getOrganizationIntegrations } from '../integration'
import { getOrganizationById } from '../organization'
import { getOrganizationMessagingAgentResponses } from '../organization-messaging-agent'
import { getOrganizationProductsAndServices } from '../organization-products-and-services'
import { getOrganizationTransactions } from '../organization-transaction'

type Classification = 'transactions' | 'productsAndServices' | 'messaging' | 'integrations' | 'organization' | 'other'

export const similarityDataSearch = async (content: string, organizationId: string) => {
    const classification = await classifyRelevantQuestion(content)
    const data = await getClassificationDataFromDatabase(classification, organizationId)

    return data
}

const classifyRelevantQuestion = async (content: string): Promise<Classification> => {
    const { object: classification } = await generateObject({
        model: openai('gpt-4o', { structuredOutputs: true }),
        output: 'enum',
        enum: ['transactions', 'productsAndServices', 'messaging', 'integrations', 'organization', 'other'],
        system: 'classify the user message as a question or statement about transactions, products and services, messaging, integrations, or organization',
        prompt: content,
    })

    return classification
}

const getClassificationDataFromDatabase = async (classification: Classification, organizationId: string) => {
    switch (classification) {
        case 'transactions':
            return await getOrganizationTransactions(organizationId)
        case 'productsAndServices':
            return await getOrganizationProductsAndServices(organizationId)
        case 'messaging':
            return await getOrganizationMessagingAgentResponses(organizationId)
        case 'integrations':
            return await getOrganizationIntegrations(organizationId)
        case 'organization':
            return await getOrganizationById(organizationId)
        default:
            return null
    }
}
