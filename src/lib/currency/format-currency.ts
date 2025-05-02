import _ from 'lodash'

export const formatCurrency = (amount: number, currency: string) => {
    if (_.isNil(amount)) {
        return '0'
    }

    if (_.isString(amount)) {
        amount = Number(amount)
    }

    if (!currency) {
        currency = 'MDL'
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    }).format(amount)
}
