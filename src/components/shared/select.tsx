import { Check, ChevronsUpDown } from 'lucide-react'
import { ReactNode, useState } from 'react'

import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select as ShadcnSelect } from '~/components/ui/select'
import { cn } from '~/lib/utils'

import { Button } from '../ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface Props {
    id?: string
    disabled?: boolean
    withSearch?: boolean
    options: { label: string | ReactNode; value: string }[]
    value: string | undefined
    placeholder?: string
    className?: string
    onChange: (value: string) => void
}

export const Select = ({ id, disabled, options, value, onChange, placeholder, withSearch = false, className }: Props) => {
    const [open, setOpen] = useState(false)

    if (withSearch) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
                        {value ? options.find((option) => option.value === value)?.label : 'Select framework...'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={cn('p-3', className)}>
                    <Command>
                        <CommandInput placeholder={placeholder} className="rounded-xs" />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={(currentValue) => {
                                            onChange(currentValue === value ? '' : currentValue)
                                        }}
                                    >
                                        {option.label}
                                        <Check className={cn('ml-auto size-4', value === option.value ? 'opacity-100' : 'opacity-0')} />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        )
    }

    return (
        <ShadcnSelect disabled={disabled} value={value} onValueChange={onChange}>
            <SelectTrigger className={cn('w-full', className)}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent id={id}>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </ShadcnSelect>
    )
}
