import { openai as vercelOpenAI } from '@ai-sdk/openai'
import { createPerplexity } from '@ai-sdk/perplexity'
import { wrapLanguageModel } from 'ai'
import { ElevenLabsClient } from 'elevenlabs'
import OpenAI from 'openai'

import { env } from '~/config/env'

import { ragMiddleware } from './lib/rag-middleware'

export const elevenLabs = new ElevenLabsClient({
    apiKey: env.ELEVENLABS_API_KEY,
})

export const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
})

export const gpt4oRAGModel = wrapLanguageModel({
    model: vercelOpenAI('gpt-4o'),
    middleware: ragMiddleware,
})

export const perplexity = createPerplexity({
    apiKey: env.PERPLEXITY_API_KEY,
})
