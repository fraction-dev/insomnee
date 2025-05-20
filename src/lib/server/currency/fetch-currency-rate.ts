import axios from 'axios'

import { InternalError } from '~/lib/operational-errors'
import { CurrencyRate } from '~/services/currency-rate/model'

const BASE_URL_PATTERN = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/{{currency}}.json'

export const fetchCurrencyRate = async (currency: string): Promise<Omit<CurrencyRate, 'id' | 'createdAt' | 'updatedAt'>> => {
    const url = BASE_URL_PATTERN.replace('{{currency}}', currency.toLowerCase())

    try {
        /**
         * The URL returns a JSON object with combinations of the currency with other currencies.
         */
        const response = await axios.get<Record<string, Record<string, string>>>(url)

        const symbol = new Intl.NumberFormat('en-US', { style: 'currency', currency })
            .formatToParts(1)
            .find((part) => part.type === 'currency')?.value

        return {
            currency,
            symbol: symbol ?? '',
            combinations: response.data[currency.toLowerCase()] ?? {},
        }
    } catch (_error) {
        throw new InternalError(`Failed to fetch currency rate for ${currency}`)
    }
}
