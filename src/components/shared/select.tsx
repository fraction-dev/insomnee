import { Check, ChevronsUpDown } from 'lucide-react'
import { ReactNode, useState } from 'react'

import { Select as ShadcnSelect,SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { cn } from '~/lib/shared/utils'

import { Button } from '../ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { ScrollArea } from '../ui/scroll-area'

interface Props {
    id?: string
    disabled?: boolean
    withSearch?: boolean
    options: { label: string | ReactNode; value: string }[]
    value: string | undefined
    placeholder?: string
    className?: string
    onChange: (value: string) => void
    children?: ReactNode
}

export const Select = ({ id, disabled, options, value, onChange, placeholder, withSearch = false, className, children }: Props) => {
    const [open, setOpen] = useState(false)

    if (withSearch) {
        return (
            <Popover modal open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    {children ? (
                        children
                    ) : (
                        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
                            {value ? (
                                options.find((option) => option.value === value)?.label
                            ) : (
                                <span className="text-muted-foreground text-sm font-normal">{placeholder}</span>
                            )}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    )}
                </PopoverTrigger>
                <PopoverContent className={cn('p-3', className)}>
                    <ScrollArea className="h-64">
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
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        )
    }

    return (
        <ShadcnSelect disabled={disabled} value={value} onValueChange={onChange}>
            <SelectTrigger className={cn('w-full', className)}>
                {children ? children : <SelectValue placeholder={placeholder} />}
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
