import { DialogMessage } from '~/services/messaging/model'
import { Organization } from '~/services/organization/model'
import { ProductAndService } from '~/services/product-and-service/model'

interface InstagramMessageGenerationAssistantPromptPayload {
    previousConversations: DialogMessage[]
    organization: Organization
    productsAndServices: ProductAndService[]
    rules: string
}

export const INSTAGRAM_MESSAGE_GENERATION_ASSISTANT_PROMPT = (payload: InstagramMessageGenerationAssistantPromptPayload) => {
    const { previousConversations, organization, productsAndServices, rules } = payload

    return `
    [1] Previous conversations: ${previousConversations.map((conversation) => conversation.content).join('\n')}
    [2] Organization: ${organization.name}
    [3] Products and services: ${productsAndServices.map((product) => product.name).join('\n')}
    [4] Rules: ${rules}
    `
}
