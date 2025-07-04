import axios from 'axios'

import { env } from '~/config/env'

interface SearchBodyParams {
    q: string // Query
    gl?: string // Country code for single country search
    hl?: string // Language code for single language search
    lr?: string[] // Language restrict codes for multiple languages
    cr?: string[] // Country codes for multiple countries
    location?: string // Location name for search
    autocomplete?: boolean // Whether to return autocomplete results
    tbs?: 'qdr:d' | 'qdr:w' | 'qdr:m' | 'qdr:y' // Time range for search (default: all time)
    num?: number // Number of results to return (default: 10)
}

export interface GoogleSearchResponse {
    searchParameters: SearchBodyParams & { type: 'search' }
    knowledgeGraph: {
        title: string
        type: string
        website: string
        imageUrl: string
        description: string
        descriptionSource: string
        descriptionLink: string
        attributes: Record<string, string>
    }
    organic: {
        title: string
        link: string
        snippet: string
        sitelinks: {
            title: string
            link: string
        }[]
        position: number
    }[]
    peopleAlsoAsk: {
        question: string
        snippet: string
        title: string
        link: string
    }
    topStories: {
        title: string
        link: string
        snippet: string
        date: string
        source: string
    }[]
    relatedSearches: { query: string }[]
}

interface WebPageScrapResponse {
    text: string
    markdown: string
    metadata: {
        description: string
    }
    credits: number
}

export class Serper {
    private readonly API_KEY: string

    constructor() {
        this.API_KEY = env.SERPER_API_KEY
    }

    public async googleSearch(params: SearchBodyParams | SearchBodyParams[]) {
        const response = await axios<GoogleSearchResponse>({
            method: 'POST',
            url: 'https://google.serper.dev/search',
            headers: {
                'X-API-KEY': this.API_KEY,
                'Content-Type': 'application/json',
            },
            data: params,
            maxBodyLength: Infinity,
        })

        return response.data
    }

    public async webPageScrap(url: string) {
        const response = await axios<WebPageScrapResponse>({
            method: 'POST',
            url: 'https://scrape.serper.dev',
            headers: {
                'X-API-KEY': this.API_KEY,
                'Content-Type': 'application/json',
            },
            data: {
                url,
                includeMarkdown: true,
            },
        })

        return response.data
    }
}
