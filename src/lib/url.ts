import qs from 'qs'

type UrlSegment = string | null | undefined
type UrlQueryParams = {
    [key: string]:
        | string
        | string[]
        | number
        | number[]
        | boolean
        | boolean[]
        | null
        | undefined
        | UrlQueryParams
        | UrlQueryParams[]
        | qs.ParsedQs
        | qs.ParsedQs[]
}

function replaceDoubleSlashes(str: string) {
    const parts = str.split('://')
    if (parts.length > 1) {
        return parts[0] + '://' + parts[1].replace(/\/\//g, '/')
    }
    return str.replace(/\/\//g, '/')
}
const replaceTrailSlash = (str: string) => str.replace(/\/$/, '')
const replaceStartSlash = (str: string) => str.replace(/^\//, '')

export const qsStringifySettings = {
    arrayFormat: 'indices',
    strictNullHandling: false,
    skipNulls: true,
    allowDots: false,
}

export const qsParseSettings = {
    strictNullHandling: qsStringifySettings.strictNullHandling,
    allowDots: qsStringifySettings.allowDots,
}

export function concatUrl(base: string, ...rest: (UrlSegment | UrlQueryParams)[]): string {
    const segments = []

    let [baseUrl, baseQueryString] = base.split('?')

    baseUrl = replaceDoubleSlashes(baseUrl)
    baseUrl = replaceTrailSlash(baseUrl)

    const baseParsedQueryParams = qs.parse(baseQueryString || '') as Record<
        string,
        string | string[] | number | number[] | boolean | boolean[] | null | undefined
    >

    let queryParams: UrlQueryParams = {
        ...baseParsedQueryParams,
    }

    for (const segment of rest) {
        if (typeof segment === 'string') {
            let seg = segment
            seg = replaceDoubleSlashes(seg)
            seg = replaceStartSlash(seg)
            seg = replaceTrailSlash(seg)
            segments.push(...seg.split('/'))
        } else {
            queryParams = {
                ...queryParams,
                ...segment,
            }
        }
    }

    const queryString = qs.stringify(queryParams, {
        arrayFormat: 'indices',
        strictNullHandling: false,
        skipNulls: true,
        allowDots: false,
    })

    let finalUrl = baseUrl
    if (segments.length) {
        finalUrl = `${baseUrl}/${segments.join('/')}`
    }

    if (queryString) {
        finalUrl = `${finalUrl}?${queryString}`
    }

    return finalUrl
}

export function getURLSearchParams(urlString: string) {
    const url = new URL(urlString)
    return qs.parse(url.searchParams.toString(), qsParseSettings)
}

export function getParsedSearchParams(searchParams: string | URLSearchParams) {
    const stringParams = typeof searchParams === 'string' ? searchParams : searchParams.toString()
    return qs.parse(stringParams, qsParseSettings)
}
