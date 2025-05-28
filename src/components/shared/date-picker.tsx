import dayjs from 'dayjs'
import { PropsWithChildren, useState } from 'react'

import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface Props {
    disabledRange?: Date | [Date, Date]
    value: string
    onChange: (date: string) => void
}

export const DatePicker = ({ value, onChange, children, disabledRange }: PropsWithChildren<Props>) => {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={dayjs(value).toDate()}
                    disabled={(date) => {
                        if (!disabledRange) return false

                        if (Array.isArray(disabledRange)) {
                            return date < disabledRange[0] || date > disabledRange[1]
                        }

                        return date > disabledRange
                    }}
                    onSelect={(date) => {
                        onChange(dayjs(date).toISOString())
                        setOpen(false)
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}
