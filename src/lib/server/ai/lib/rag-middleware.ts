import { LanguageModelV1Middleware } from 'ai'
import { z } from 'zod'

import { similarityDataSearch } from '~/services/ai/similarity-search'

const schema = z.object({
    context: z.object({
        organizationId: z.string(),
    }),
})

export const ragMiddleware: LanguageModelV1Middleware = {
    transformParams: async ({ params }) => {
        const { prompt, providerMetadata } = params
        const { success, data } = schema.safeParse(providerMetadata)

        if (!success) return params

        const recentMessage = prompt.pop()

        if (!recentMessage || recentMessage.role !== 'user') {
            if (recentMessage) {
                prompt.push(recentMessage)
            }
            return params
        }

        const lastUserMessageContent = recentMessage.content
            .filter((content): content is { type: 'text'; text: string } => content.type === 'text')
            .map((content) => content.text)
            .join('\n')

        const similarityData = await similarityDataSearch(lastUserMessageContent, data.context.organizationId)

        prompt.push({
            role: 'user',
            content: [...recentMessage.content, { type: 'text', text: JSON.stringify(similarityData ?? []) }],
        })

        return { ...params, prompt }
    },
}
