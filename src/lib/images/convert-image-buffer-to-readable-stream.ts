import { ReadableStream } from 'stream/web'

export const convertImageBufferToReadableStream = (image: ArrayBuffer): ReadableStream<Uint8Array> => {
    return new ReadableStream({
        start(controller) {
            controller.enqueue(new Uint8Array(image))
            controller.close()
        },
    })
}
