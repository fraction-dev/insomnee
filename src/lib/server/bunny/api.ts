import { ReadableStream, WritableStream } from 'stream/web'

import { convertImageBufferToReadableStream } from '~/lib/images/convert-image-buffer-to-readable-stream'
import { convertImageUrlToReadableStream } from '~/lib/images/convert-image-url-to-readable-stream'

import { BUNNY_STORAGE_HOSTNAME } from './consts'
import { bunny, bunnyStorage } from './index'

export const uploadImage = async (path: string, imageUrl: string): Promise<{ originImageUrl: string; url: string }> => {
    const imageStream = await convertImageUrlToReadableStream(imageUrl)
    await bunnyStorage.file.upload(bunny, path, imageStream)

    return { originImageUrl: imageUrl, url: `https://${BUNNY_STORAGE_HOSTNAME}${path}` }
}

export const uploadImageBuffer = async (path: string, image: ArrayBuffer): Promise<string> => {
    const imageStream = convertImageBufferToReadableStream(image)

    await bunnyStorage.file.upload(bunny, path, imageStream)
    return `https://${BUNNY_STORAGE_HOSTNAME}${path}`
}

export const uploadReadableStreamImage = async (path: string, imageStream: ReadableStream): Promise<string> => {
    await bunnyStorage.file.upload(bunny, path, imageStream)
    return `https://${BUNNY_STORAGE_HOSTNAME}${path}`
}

export const uploadFile = async (path: string, file: File): Promise<string> => {
    const fileStream = new ReadableStream({
        start(controller) {
            file.stream().pipeTo(
                new WritableStream({
                    write(chunk) {
                        controller.enqueue(chunk)
                    },
                    close() {
                        controller.close()
                    },
                }),
            )
        },
    })
    await bunnyStorage.file.upload(bunny, path, fileStream)

    return `https://${BUNNY_STORAGE_HOSTNAME}${path}`
}
