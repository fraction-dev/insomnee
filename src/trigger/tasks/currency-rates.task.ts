import { schedules } from '@trigger.dev/sdk/v3'
import { getCurrencyRates, upsertCurrencyRate } from 'prisma/services/currency-rates'

import { CURRENCIES } from '~/lib/consts/currencies'
import { fetchCurrencyRate } from '~/lib/server/currency/fetchCurrencyRate'

import { TriggerTasks } from '../types/tasks'

export const fetchCurrencyRatesTask = schedules.task({
    id: TriggerTasks.FETCH_CURRENCY_RATES,
    cron: {
        pattern: '0 0 * * *', // every day at 00:00
        timezone: 'Europe/Bucharest',
    },
    run: async () => {
        const dbCurrencyRates = await getCurrencyRates()
        if (!dbCurrencyRates.length) {
            const results = await Promise.allSettled(CURRENCIES.map(async (currency) => fetchCurrencyRate(currency.code.toLowerCase())))
            const rates = results
                .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
                .map((result) => result.value)

            await Promise.all(rates.map(async (rate) => upsertCurrencyRate(rate)))
            return
        }

        const results = await Promise.allSettled(
            dbCurrencyRates.map(async (currency) => fetchCurrencyRate(currency.currency.toLowerCase())),
        )
        const rates = results
            .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
            .map((result) => result.value)

        await Promise.all(rates.map(async (rate) => upsertCurrencyRate(rate)))
    },
})
