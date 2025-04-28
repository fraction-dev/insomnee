export interface InstagramMessagingWebhook {
    entry: Array<{
        id: string
        time: number
        messaging: Array<{
            message: { mid: string; text: string }
            recipient: { id: string }
            sender: { id: string }
            timestamp: number
        }>
    }>
}
