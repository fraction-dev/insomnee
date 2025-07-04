import { openai } from '@ai-sdk/openai'
import { createId } from '@paralleldrive/cuid2'
import { generateObject } from 'ai'
import { z } from 'zod'

import { LeadsGenerationAgentOnboardingDirtyFormSchemaType, LeadsGenerationAgentSignalCategory } from '../model'

const SYSTEM_PROMPT = {
    jobs: `
    You are a helpful assistant that generates essential and additional signals for a job framework.
    Use provided data to generate the content based on your schema.
    The signals must be fully matched with the provided data and be as much detailed as possible.
    `,
    news: `
    You are a helpful assistant that generates essential and additional signals for a news framework.
    Use provided data to generate the content based on your schema.
    The signals must be fully matched with the provided data and be as much detailed as possible.
    `,
}

const EXAMPLE_SIGNALS = `
jobFrameworks: {
     essentialSignals: [
      {
        category: "Customer Support Expansion",
        signals: [
          {
            id: "550e8400-e29b-41d4-a716-446655440001",
            content: "Looking to scale customer support operations",
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440002",
            content: "Building or expanding support team",
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440003",
            content: "Implementing customer success initiatives",
          },
        ],
      },
      {
        category: "Technology Infrastructure",
        signals: [
          {
            id: "550e8400-e29b-41d4-a716-446655440004",
            content: "Seeking automation solutions for support",
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440005",
            content: "Looking for AI/ML capabilities in customer service",
          },
        ],
      },
    ],
    additionalSignals: [
      {
        category: "Growth Indicators",
        signals: [
          {
            id: "550e8400-e29b-41d4-a716-446655440006",
            content: "Rapid customer growth requiring support scaling",
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440007",
            content: "International expansion plans",
          },
        ],
      },
    ],
    }

    newsFrameworks: {
    essentialSignals: [
      {
        category: "Strategic Initiatives",
        signals: [
          {
            id: "550e8400-e29b-41d4-a716-446655440008",
            content: "Announcing customer support expansion",
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440009",
            content: "Investing in customer success technology",
          },
        ],
      },
    ],
    additionalSignals: [
      {
        category: "Growth News",
        signals: [
          {
            id: "550e8400-e29b-41d4-a716-446655440010",
            content: "Series A or higher funding round",
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440011",
            content: "International market expansion",
          },
        ],
      },
    ],
    }
`

export const generateFrameworkSignals = async (
    input: LeadsGenerationAgentOnboardingDirtyFormSchemaType,
): Promise<{
    jobFrameworks: {
        essentialSignals: LeadsGenerationAgentSignalCategory[]
        additionalSignals: LeadsGenerationAgentSignalCategory[]
    }
    newsFrameworks: {
        essentialSignals: LeadsGenerationAgentSignalCategory[]
        additionalSignals: LeadsGenerationAgentSignalCategory[]
    }
    totalTokenUsage: number
}> => {
    const getPrompt = (type: 'jobs' | 'news') => {
        return `
        ${SYSTEM_PROMPT[type]}
        ${EXAMPLE_SIGNALS}
        Do not follow 1:1 mapping with the example signals. Generate signals that are relevant to the input payload.
        Input payload: ${JSON.stringify(input, null, 2)}
        `
    }

    const jobFrameworksRequest = generateObject({
        model: openai('gpt-3.5-turbo'),
        schema: z.object({
            essentialSignals: z.array(z.object({ category: z.string(), signals: z.array(z.object({ content: z.string() })) })),
            additionalSignals: z.array(z.object({ category: z.string(), signals: z.array(z.object({ content: z.string() })) })),
        }),
        prompt: getPrompt('jobs'),
    })

    const newsFrameworksRequest = generateObject({
        model: openai('gpt-3.5-turbo'),
        schema: z.object({
            essentialSignals: z.array(z.object({ category: z.string(), signals: z.array(z.object({ content: z.string() })) })),
            additionalSignals: z.array(z.object({ category: z.string(), signals: z.array(z.object({ content: z.string() })) })),
        }),
        prompt: getPrompt('news'),
    })

    const [jobFrameworksResponse, newsFrameworksResponse] = await Promise.all([jobFrameworksRequest, newsFrameworksRequest])

    const totalTokenUsage = jobFrameworksResponse.usage.totalTokens + newsFrameworksResponse.usage.totalTokens

    return {
        jobFrameworks: {
            essentialSignals: jobFrameworksResponse.object.essentialSignals.map((signal) => ({
                category: signal.category,
                signals: signal.signals.map((s) => ({ id: createId(), content: s.content })),
            })),
            additionalSignals: jobFrameworksResponse.object.additionalSignals.map((signal) => ({
                category: signal.category,
                signals: signal.signals.map((s) => ({ id: createId(), content: s.content })),
            })),
        },
        newsFrameworks: {
            essentialSignals: newsFrameworksResponse.object.essentialSignals.map((signal) => ({
                category: signal.category,
                signals: signal.signals.map((s) => ({ id: createId(), content: s.content })),
            })),
            additionalSignals: newsFrameworksResponse.object.additionalSignals.map((signal) => ({
                category: signal.category,
                signals: signal.signals.map((s) => ({ id: createId(), content: s.content })),
            })),
        },
        totalTokenUsage,
    }
}
