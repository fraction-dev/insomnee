import { createDeepSeek } from '@ai-sdk/deepseek'
import { createPerplexity } from '@ai-sdk/perplexity'
import { ElevenLabsClient } from 'elevenlabs'
import OpenAI from 'openai'
import { env } from '~/config/env'
import { GenerateTextPayload } from './lib/generateText'

export const deepseek = createDeepSeek({
    apiKey: env.DEEPSEEK_API_KEY,
})

export const elevenLabs = new ElevenLabsClient({
    apiKey: env.ELEVENLABS_API_KEY,
})

export const perplexity = createPerplexity({
    apiKey: env.PERPLEXITY_API_KEY,
})

export const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
})

export const generateText = async (payload: GenerateTextPayload): Promise<{ text: string; totalTokens: number }> => {
    const { model, messages, responseFormat, maxTokens, temperature } = payload

    const output = await openai.chat.completions.create({
        model,
        messages,
        response_format: responseFormat,
        max_tokens: maxTokens,
        temperature,
    })

    return {
        text: output.choices[0].message.content ?? '',
        totalTokens: output.usage?.total_tokens ?? 0,
    }
}
