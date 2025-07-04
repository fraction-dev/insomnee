/**
 * Format the number to a string with the following format:
 * If the number is less than 1000, return the same value,
 * If the number is greater than 1000, return the value with the following format:
 * 10,000
 * 100,000
 * 1,000,000
 * 10,000,000
 * 100,000,000
 * 1,000,000,000
 * 10,000,000,000
 * 100,000,000,000
 * 1,000,000,000,000
 */
export const formatNumberToReadableString = (value: number) => {
    if (value < 1000) {
        return value.toString()
    }

    const suffixes = ['', 'k', 'm', 'b', 't']
    const suffixIndex = Math.floor(Math.log10(value) / 3)
    const scaledValue = value / Math.pow(10, suffixIndex * 3)

    return scaledValue.toFixed(1) + suffixes[suffixIndex]
}
