import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'

import { getOrganizationIntegrations } from '../integration'
import { getOrganizationMessagingAgentResponses } from '../messaging-agent'
import { getOrganizationById } from '../organization'
import { getOrganizationProductsAndServices } from '../product-and-service'
import { getTransactions } from '../transaction'

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
            return await getTransactions(organizationId)
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
