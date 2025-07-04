import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'

import { COUNTRIES } from '~/consts/counties'
import { LeadsGenerationAgentOnboardingFormSchema } from '~/services/leads-generation/model'

import { SYSTEM_PROMPT } from './prompt'

export const generateConfigurationData = async ({
    markdown,
    targetCountry,
    companyName,
    solution,
}: {
    markdown: string
    targetCountry: string
    companyName: string
    solution: string
}) => {
    const prompt = `
        Website markdown content: ${markdown}
        Company name: ${companyName}
        Solution: ${solution}
        Target country: ${COUNTRIES.find((country) => country.code === targetCountry)?.name ?? 'United States of America'}
        System prompt: ${SYSTEM_PROMPT}
    `

    const { object, usage } = await generateObject({
        model: openai('gpt-4o-mini'),
        schema: LeadsGenerationAgentOnboardingFormSchema,
        prompt,
        maxTokens: 10000,
        temperature: 1,
    })

    return {
        configuration: object,
        usage,
    }
}
