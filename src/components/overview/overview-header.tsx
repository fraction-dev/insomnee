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
        <div className="flex items-center justify-end">
            <div className="flex items-center gap-3">
                <RangePicker date={date} onSelect={onDateChange} maxDays={30} />
                <Select
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
