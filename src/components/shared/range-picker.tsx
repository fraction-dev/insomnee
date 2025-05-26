import dayjs from 'dayjs'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

import { cn } from '~/lib/shared/utils'

import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Separator } from '../ui/separator'

interface Props {
    date: DateRange | undefined
    maxDays?: number
    className?: string
    onSelect: (range: DateRange | undefined) => void
}

export const RangePicker = ({ date, className, onSelect, maxDays = 30 }: Props) => {
    const [range, setRange] = useState<DateRange | undefined>(date)

    const handleApplyRangeUpdate = () => {
        onSelect({
            from: dayjs(range?.from ?? dayjs().subtract(6, 'days').toDate()).toDate(),
            to: dayjs(range?.to ?? dayjs().toDate()).toDate(),
        })
    }

    return (
        <div className={cn('grid gap-2', className)}>
            <Popover onOpenChange={handleApplyRangeUpdate}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn('md:w-[300px] justify-start text-left font-normal relative', !date && 'text-muted-foreground')}
                    >
                        <CalendarIcon />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {dayjs(date.from).format('DD.MM.YYYY')} - {dayjs(date.to).format('DD.MM.YYYY')}
                                </>
                            ) : (
                                dayjs(date.from).format('DD.MM.YYYY')
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 " align="start">
                    <div className="flex flex-col gap-2 pb-4">
                        <Calendar
                            initialFocus
                            disabled={(day) => {
                                if (dayjs(day).isAfter(dayjs())) {
                                    return true
                                }
                                return false
                            }}
                            mode="range"
                            defaultMonth={range?.from}
                            selected={range}
                            numberOfMonths={2}
                            max={maxDays}
                            onSelect={(range) => setRange(range)}
                        />

                        <div className="flex flex-col gap-4 px-4">
                            <Separator />

                            <p className="text-xs text-muted-foreground">You can select up to {maxDays} days</p>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
