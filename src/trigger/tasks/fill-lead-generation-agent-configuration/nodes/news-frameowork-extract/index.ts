import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'

import { LeadsGenerationAgentOnboardingFormSchemaType, LeadsGenerationAgentOnboardingSchema } from '~/services/leads-generation/model'

import { SYSTEM_PROMPT } from './prompt'

export const extractNewsFramework = async (data: LeadsGenerationAgentOnboardingFormSchemaType) => {
    const prompt = `
        Transform the following onboarding data into the required newsFramework format.
        
        Input data: ${JSON.stringify(data, null, 2)}
        
        IMPORTANT TRANSFORMATION RULES:
        1. Convert 'keywords' array to 'searchKeywords' array
        2. Convert 'essentialSignals' (array of strings) to 'essentialSignals' (array of SignalCategorySchema objects)
        3. Convert 'additionalSignals' (array of strings) to 'additionalSignals' (array of SignalCategorySchema objects)
        4. Convert 'countries' array to 'searchConfig.countries' array
        5. Generate unique UUIDs for each signal using crypto.randomUUID() format
        6. Group related signals under logical categories (e.g., "Technology", "Growth Stage", "Funding", "Hiring Patterns")
        7. Each SignalCategorySchema should have: { category: string, signals: [{ id: string, content: string }] }
        
        System prompt: ${SYSTEM_PROMPT}
    `

    const { object, usage } = await generateObject({
        model: openai('gpt-4o-mini'),
        schema: LeadsGenerationAgentOnboardingSchema,
        prompt,
        maxTokens: 10000,
        temperature: 1,
    })

    return {
        newsFramework: object.newsFramework,
        usage,
    }
}
