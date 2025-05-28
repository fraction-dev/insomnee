import Pluralize from 'pluralize'

export const pluralize = (word: string, count: number = 2, inclusive: boolean = false) => {
    return Pluralize(word, count, inclusive)
}

/**
 * Generates initials from a given string.
 *
 * Features:
 * - Handles various name formats (first last, first middle last, etc.)
 * - Supports hyphenated names
 * - Options for titles and suffixes
 * - Unicode/international character support
 * - Configurable options for output formatting
 * - Trims and normalizes input
 *
 * @param input - The string to extract initials from
 * @param options - Configuration options
 * @returns The generated initials string
 */
export function getInitials(
    input: string,
    options: {
        maxInitials?: number // Maximum number of initials to return
        delimiter?: string // Character to place between initials
        uppercase?: boolean // Convert to uppercase
        includeTitles?: boolean // Include titles (Dr., Mr., etc.)
        includeSuffixes?: boolean // Include suffixes (Jr., Sr., etc.)
        stripPunctuation?: boolean // Remove punctuation before processing
        ignoreWords?: string[] // Words to ignore (e.g., "of", "the", "and")
    } = {},
): string {
    // Default options
    const {
        maxInitials = 3,
        delimiter = '',
        uppercase = true,
        includeTitles = false,
        includeSuffixes = false,
        stripPunctuation = true,
        ignoreWords = ['the', 'of', 'and', 'a', 'an', 'at', 'by', 'for', 'in', 'to'],
    } = options

    // Return empty string for empty input
    if (!input || input.trim() === '') {
        return ''
    }

    // Common titles and suffixes for filtering
    const titles = ['mr', 'mrs', 'ms', 'miss', 'dr', 'prof', 'rev', 'hon', 'lord', 'lady', 'sir', 'madam']
    const suffixes = ['jr', 'sr', 'ii', 'iii', 'iv', 'v', 'phd', 'md', 'dds', 'esq']

    // Normalize the input
    let normalizedInput = input.trim()

    // Strip punctuation if requested
    if (stripPunctuation) {
        normalizedInput = normalizedInput.replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    }

    // Split by whitespace and remove empty items
    let parts = normalizedInput.split(/\s+/).filter((part) => part.length > 0)

    // Filter out titles if not includeTitles
    if (!includeTitles) {
        parts = parts.filter((part) => {
            const normalized = part.toLowerCase().replace(/\./g, '')
            return !titles.includes(normalized)
        })
    }

    // Filter out suffixes if not includeSuffixes
    if (!includeSuffixes) {
        parts = parts.filter((part) => {
            const normalized = part.toLowerCase().replace(/\./g, '')
            return !suffixes.includes(normalized)
        })
    }

    // Filter out ignored words (now doing case-insensitive comparison)
    if (ignoreWords && ignoreWords.length > 0) {
        parts = parts.filter((part) => !ignoreWords.map((w) => w.toLowerCase()).includes(part.toLowerCase()))
    }

    // If no parts remain after filtering, use the original input
    if (parts.length === 0) {
        parts = normalizedInput.split(/\s+/).filter((part) => part.length > 0)
    }

    // Process each part to extract initials
    const initials = parts.map((part) => {
        // Handle hyphenated names (e.g., Smith-Jones)
        if (part.includes('-')) {
            return part
                .split('-')
                .map((subPart) => subPart.charAt(0))
                .join('-')
        }

        // Regular case - first character
        return part.charAt(0)
    })

    // Limit to maxInitials
    const limitedInitials = initials.slice(0, maxInitials)

    // Format the initials
    let result = limitedInitials.join(delimiter)

    // Apply case transformation
    result = uppercase ? result.toUpperCase() : result

    return result
}
