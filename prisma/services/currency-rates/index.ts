import { CurrencyRate as PrismaCurrencyRate } from '@prisma/client'
import { prisma } from 'prisma/db'

import logger from '~/core/logger'
import { CurrencyRate } from '~/services/currency-rate/model'

export const getCurrencyRates = async () => {
    const currencyRates = await prisma.currencyRate.findMany()

    if (!currencyRates.length) {
        logger.warn('Database is not populated with currency rates')
        return []
    }

    return currencyRates.map(mapPrismaCurrencyRateToCurrencyRate)
}

export const upsertCurrencyRate = async (currencyRate: Omit<CurrencyRate, 'id' | 'createdAt' | 'updatedAt'>) => {
    await prisma.currencyRate.upsert({
        where: { currency: currencyRate.currency },
        update: currencyRate,
        create: currencyRate,
    })
}

const mapPrismaCurrencyRateToCurrencyRate = (currencyRate: PrismaCurrencyRate): CurrencyRate => {
    return {
        id: currencyRate.id,
        currency: currencyRate.currency,
        symbol: currencyRate.symbol ?? '',
        combinations: currencyRate.combinations as Record<string, string>,
        createdAt: currencyRate.createdAt,
        updatedAt: currencyRate.updatedAt,
    }
}
