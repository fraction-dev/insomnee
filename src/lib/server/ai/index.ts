import { createDeepSeek } from '@ai-sdk/deepseek'
import { createPerplexity } from '@ai-sdk/perplexity'
import { ElevenLabsClient } from 'elevenlabs'
import OpenAI from 'openai'
import { env } from '~/config/env'

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
