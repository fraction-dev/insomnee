import * as CurrencyRateDB from 'prisma/services/currency-rates'

import logger from '~/core/logger'
import { CURRENCIES } from '~/lib/consts/currencies'
import { fetchCurrencyRate } from '~/lib/server/currency/fetchCurrencyRate'

import { CurrencyRate } from './model'

export const getCurrencyRates = async () => {
    const currencyRates = await CurrencyRateDB.getCurrencyRates()
    if (!currencyRates.length) {
        logger.warn('Database is not populated with currency rates')
        return await populateCurrencyRates()
    }

    return currencyRates
}

export const populateCurrencyRates = async (): Promise<CurrencyRate[]> => {
    const results = await Promise.allSettled(CURRENCIES.map(async (currency) => fetchCurrencyRate(currency.code.toLowerCase())))
    const rates = results
        .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
        .map((result) => result.value)

    await Promise.all(rates.map(async (rate) => CurrencyRateDB.upsertCurrencyRate(rate)))
    return rates
}
