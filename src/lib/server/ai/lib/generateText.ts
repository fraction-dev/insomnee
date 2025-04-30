import { Tool } from 'openai/resources/responses/responses.mjs'

interface Message {
    role: 'user' | 'assistant' | 'system'
    content: string
}

export interface GenerateTextPayload {
    model: string
    messages: Message[]
    responseFormat?: { type: 'json_object' }
    maxTokens?: number
    temperature?: number
    tools?: Tool[]
}
