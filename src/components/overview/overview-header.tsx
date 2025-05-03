import { DateRange } from 'react-day-picker'

import { CURRENCIES } from '~/lib/consts/currencies'

import { RangePicker } from '../shared/range-picker'
import { Select } from '../shared/select'

interface Props {
    currency: string
    date: DateRange | undefined
    onCurrencyChange: (currency: string) => void
    onDateChange: (date: DateRange | undefined) => void
}

export const OverviewHeader = ({ currency, date, onCurrencyChange, onDateChange }: Props) => {
    return (
        <div className="md:flex md:items-center md:justify-end">
            <div className="flex items-center flex-row gap-3">
                <RangePicker className="w-full md:w-auto" date={date} maxDays={30} onSelect={onDateChange} />
                <Select
                    withSearch
                    options={CURRENCIES.map((currency) => ({
                        label: currency.code,
                        value: currency.code,
                    }))}
                    value={currency}
                    onChange={(value) => onCurrencyChange(value)}
                />
            </div>
        </div>
    )
}
