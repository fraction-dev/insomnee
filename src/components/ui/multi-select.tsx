import { cva, type VariantProps } from 'class-variance-authority'
import { CheckIcon, ChevronDown, XIcon } from 'lucide-react'
import * as React from 'react'

import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { cn } from '~/lib/shared/utils'

import { ScrollArea } from './scroll-area'

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva('m-1', {
    variants: {
        variant: {
            default: 'border-foreground/10 text-foreground bg-card hover:bg-card/80',
            secondary: 'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
            destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
            inverted: 'inverted',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
})

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof multiSelectVariants> {
    /**
     * An array of option objects to be displayed in the multi-select component.
     * Each option object has a label, value, and an optional icon.
     */
    options: {
        /** The text to display for the option. */
        label: string
        /** The unique value associated with the option. */
        value: string
        /** Optional icon component to display alongside the option. */
        icon?: React.ComponentType<{ className?: string }>
    }[]

    /**
     * Callback function triggered when the selected values change.
     * Receives an array of the new selected values.
     */
    onValueChange: (value: string[]) => void

    /** The default selected values when the component mounts. */
    defaultValue?: string[]

    /**
     * Placeholder text to be displayed when no values are selected.
     * Optional, defaults to "Select options".
     */
    placeholder?: string

    /**
     * Additional class names to apply custom styles to the multi-select component.
     * Optional, can be used to add custom styles.
     */
    className?: string

    /**
     * Whether to show the search input in the multi-select component.
     * Optional, defaults to false.
     */
    withSearch?: boolean
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
    (
        { options, onValueChange, variant, defaultValue = [], placeholder = 'Select options', className, withSearch = false, ...props },
        ref,
    ) => {
        const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue)
        const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

        const toggleOption = (option: string) => {
            const newSelectedValues = selectedValues.includes(option)
                ? selectedValues.filter((value) => value !== option)
                : [...selectedValues, option]
            setSelectedValues(newSelectedValues)
            onValueChange(newSelectedValues)
        }

        return (
            <Popover modal open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button
                        ref={ref}
                        {...props}
                        variant="outline"
                        className={cn(
                            'flex w-full p-1 rounded-xs border border-input min-h-9 h-auto items-center justify-between bg-white dark:bg-neutral-900 hover:bg-white dark:hover:bg-neutral-900 [&_svg]:pointer-events-auto',
                            className,
                        )}
                    >
                        {selectedValues.length > 0 ? (
                            <div className="flex justify-between items-center w-full">
                                <div className="flex flex-wrap items-center">
                                    {selectedValues.map((value) => {
                                        const option = options.find((o) => o.value === value)
                                        return (
                                            <Badge
                                                key={value}
                                                className={cn(
                                                    'rounded-xs p-1 flex justify-between items-center',
                                                    multiSelectVariants({ variant }),
                                                )}
                                            >
                                                {option?.label}

                                                <button
                                                    type="button"
                                                    className="ml-2 p-0.5 hover:bg-muted rounded-sm"
                                                    onClick={(event) => {
                                                        event.stopPropagation()
                                                        toggleOption(value)
                                                    }}
                                                >
                                                    <XIcon className="size-3 text-muted-foreground" />
                                                </button>
                                            </Badge>
                                        )
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between w-full mx-auto">
                                <span className="text-[13px] text-muted-foreground pl-2 font-normal">{placeholder}</span>
                                <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
                            </div>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start" onEscapeKeyDown={() => setIsPopoverOpen(false)}>
                    <Command>
                        {withSearch && <CommandInput placeholder="Search..." className="border-none" />}
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <ScrollArea className="min-h-48">
                                <CommandGroup>
                                    {options.map((option) => {
                                        const isSelected = selectedValues.includes(option.value)
                                        return (
                                            <CommandItem
                                                key={option.value}
                                                className="cursor-pointer"
                                                onSelect={() => toggleOption(option.value)}
                                            >
                                                <div
                                                    className={cn(
                                                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                                        isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible',
                                                    )}
                                                >
                                                    <CheckIcon className="size-4 opacity-50" />
                                                </div>
                                                {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                                                <span>{option.label}</span>
                                            </CommandItem>
                                        )
                                    })}
                                </CommandGroup>
                            </ScrollArea>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        )
    },
)

MultiSelect.displayName = 'MultiSelect'
