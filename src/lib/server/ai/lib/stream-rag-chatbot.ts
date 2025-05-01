import { streamText } from 'ai'
import { first, truncate } from 'lodash'

import { createUserChat } from '~/services/user-chat'

import { gpt4oRAGModel } from '../index'

const SYSTEM_PROMPT = `
You are a helpful support assistant for Insomnee organization. 
Your primary goal is to assist organization members with their questions and concerns.

Guidelines:
[1]. First, try to answer questions using the provided data based on classification of the user message.
[2]. If the knowledge base contains relevant information, prioritize that information in your response.
[3]. For general questions not covered in the knowledge base, you may provide helpful general information based on your knowledge.
[4]. If you cannot answer the question based on the data provided:
 - Kindly ask the user to provide more information.
 - Is the data classification data is provided but it's empty, say that for this question there is no information available.
 - If the user message is not related to the organization, try to answer the question based on your knowledge.
 - If there is no way to answer the question at all, say to try to contact support email: 'support@insomnee.ai'
 - If the overall data exists, but no the data provided for the question, say that for this question there is no information available.
[5]. Keep responses concise, professional, and helpful.
[6]. For technical questions, provide step-by-step guidance when possible.
[7]. Always answer in the same language as the user message.
[8]. If the user message is not related to the organization, try to answer the question based on your knowledge.
`

export const streamRagChatbot = ({
    organizationId,
    messages,
    chatId,
    userId,
}: {
    organizationId: string
    messages: {
        role: NonNullable<'user' | 'assistant' | 'system' | undefined>
        content: string
    }[]
    chatId: string
    userId: string
}) => {
    const onFinish = async ({ text }: { text: string }) => {
        await createUserChat({
            id: chatId,
            userId,
            messages: [...messages, { role: 'assistant', content: text }],
            title: truncate(first(messages)?.content || '', { length: 150 }),
        })
    }

    return streamText({
        model: gpt4oRAGModel,
        providerOptions: {
            context: {
                organizationId,
            },
        },
        system: SYSTEM_PROMPT,
        messages,
        onFinish,
        experimental_telemetry: {
            isEnabled: true,
            functionId: 'stream-text',
        },
    })
}
