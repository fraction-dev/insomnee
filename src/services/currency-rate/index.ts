import * as CurrencyRateService from 'prisma/services/currency-rates'

export const getCurrencyRates = async () => {
    const currencyRates = await CurrencyRateService.getCurrencyRates()
    return currencyRates
}
