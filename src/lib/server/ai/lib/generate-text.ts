import { Tool } from 'ai'
import { ChatModel } from 'openai/resources/shared.mjs'

import { openai } from '~/lib/server/ai'

interface Message {
    role: 'user' | 'assistant' | 'system'
    content: string
}

interface GenerateTextPayload {
    model: ChatModel
    messages: Message[]
    responseFormat?: { type: 'json_object' }
    maxTokens?: number
    temperature?: number
    tools?: Tool[]
}

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
