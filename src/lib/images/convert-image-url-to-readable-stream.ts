import { ReadableStream } from 'stream/web'

import { InternalError } from '../shared/operational-errors'

/**
 * @param imageUrl - The URL of the image to convert.
 * @returns A promise that resolves to a readable stream.
 */
export const convertImageUrlToReadableStream = async (imageUrl: string): Promise<ReadableStream<Uint8Array>> => {
    const response = await fetch(imageUrl)
    if (!response.ok) {
        throw new InternalError('Failed to fetch image')
    }

    const stream = response.body
    if (!stream) {
        throw new InternalError('Stream is null')
    }

    return new ReadableStream({
        start(controller) {
            const reader = stream.getReader()
            function push() {
                reader.read().then(({ done, value }) => {
                    if (done) {
                        controller.close()
                        return
                    }
                    controller.enqueue(value)
                    push()
                })
            }
            push()
        },
    })
}
