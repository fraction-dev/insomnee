/**
 * The size of the file is provided in the bytes.
 * The function converts the size to a more readable format,
 * e.g. 1024 -> 1 KB, 1024 * 1024 -> 1 MB, 1024 * 1024 * 1024 -> 1 GB
 */

export const getReadableFileSize = (size: number) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    let index = 0

    while (size >= 1024) {
        size /= 1024
        index++
    }

    return `${size.toFixed(2)} ${units[index]}`
}
