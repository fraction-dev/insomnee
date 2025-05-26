import { InternalError } from '~/lib/shared/operational-errors'

import { fetchCurrencyRate } from './fetch-currency-rate'

describe('fetchCurrencyRate', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should return the currency rate and symbol on success', async () => {
        const currencyRate = await fetchCurrencyRate('USD')
        expect(currencyRate).toBeDefined()
        expect(currencyRate.currency).toBe('USD')
        expect(currencyRate.symbol).toBe('$')
        expect(currencyRate.combinations).toBeDefined()
    })

    it('should throw type of InternalError if the currency is not found', async () => {
        await expect(fetchCurrencyRate('XXX')).rejects.toThrow(InternalError)
    })
})
