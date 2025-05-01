import { openai as vercelOpenAI } from '@ai-sdk/openai'
import { wrapLanguageModel } from 'ai'
import { ElevenLabsClient } from 'elevenlabs'
import OpenAI from 'openai'
import { Tool } from 'openai/resources/responses/responses.mjs'
import { env } from '~/config/env'
import { ragMiddleware } from './lib/rag-middleware'

interface Message {
    role: 'user' | 'assistant' | 'system'
    content: string
}

interface GenerateTextPayload {
    model: string
    messages: Message[]
    responseFormat?: { type: 'json_object' }
    maxTokens?: number
    temperature?: number
    tools?: Tool[]
}

export const elevenLabs = new ElevenLabsClient({
    apiKey: env.ELEVENLABS_API_KEY,
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

export const gpt4oRAGModel = wrapLanguageModel({
    model: vercelOpenAI('gpt-4o'),
    middleware: ragMiddleware,
})
