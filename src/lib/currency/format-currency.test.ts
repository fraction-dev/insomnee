import { formatCurrency } from './format-currency'

describe('formatCurrency', () => {
    it('Works with USD', () => {
        expect(formatCurrency(100, 'USD')).toEqual('$100.00')
    })

    it('Works with EUR', () => {
        expect(formatCurrency(100, 'EUR')).toEqual('€100.00')
    })

    it('Works with MDL', () => {
        expect(formatCurrency(100, 'MDL')).toEqual('MDL 100.00')
    })

    it('Works with null', () => {
        // @ts-expect-error
        expect(formatCurrency(null, 'MDL')).toEqual('0')
    })
})
