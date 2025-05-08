import { formatDateToReadableString, formatToShortDate } from './date'

describe('formatToShortDate', () => {
    it('Works with basic date', () => {
        expect(formatToShortDate(new Date('2021-01-01'))).toEqual('01.01.2021')
    })

    it('Works with date in different format', () => {
        expect(formatToShortDate(new Date('2021-01-01'))).toEqual('01.01.2021')
    })
})

describe('formatDateToReadableString', () => {
    it('Works with basic date', () => {
        expect(formatDateToReadableString(new Date('2025-05-02'))).toEqual('02 May, 2025')
    })

    it('Works with date with hours', () => {
        expect(formatDateToReadableString(new Date('2025-05-02 12:00:00'), { withHours: true })).toEqual('02 May 2025, 12:00')
    })
})
