import { ChangeEvent, FocusEvent, KeyboardEvent, ReactNode, useEffect, useRef, useState } from 'react'

import { Input } from '~/components/ui/input'
import { Select as ShadcnSelect,SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { cn } from '~/lib/utils'

interface Props {
    id?: string
    disabled?: boolean
    withSearch?: boolean
    options: { label: string | ReactNode; value: string }[]
    value: string | undefined
    placeholder?: string
    searchInputPlaceholder?: string
    className?: string
    onChange: (value: string) => void
}

export const Select = ({
    id,
    disabled,
    options,
    value,
    onChange,
    placeholder,
    withSearch = false,
    searchInputPlaceholder = 'Search',
    className,
}: Props) => {
    const [search, setSearch] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setSearch('')
    }, [value])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setSearch(e.target.value)
    }

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation()
        if (e.key === 'Escape') {
            e.preventDefault()
            inputRef.current?.blur()
        }
    }

    const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
        e.stopPropagation()
    }

    const filteredSearchOptions = options.filter((option) => {
        if (typeof option.label === 'string') {
            return option.label.toLowerCase().includes(search.toLowerCase())
        }

        if (typeof option.label === 'object') {
            return option.value.toString().toLowerCase().includes(search.toLowerCase())
        }

        return false
    })

    return (
        <ShadcnSelect disabled={disabled} value={value} onValueChange={onChange} onOpenChange={() => setSearch('')}>
            <SelectTrigger className={cn('w-full', className)}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent id={id}>
                {withSearch && (
                    <div className="fixed top-0 z-10 bg-white p-1 w-full">
                        <Input
                            ref={inputRef}
                            autoFocus
                            className="w-full shadow-none placeholder:text-sm placeholder:font-light placeholder:text-gray-500 border-b border-border border-l-0 border-r-0 border-t-0"
                            placeholder={searchInputPlaceholder}
                            value={search}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                            onClick={(e) => e.stopPropagation()}
                            onFocus={handleInputFocus}
                        />
                    </div>
                )}
                <div
                    className={cn({
                        'mt-10': withSearch,
                        'mt-12 text-center pb-2': withSearch && filteredSearchOptions.length === 0,
                    })}
                >
                    {filteredSearchOptions.length ? (
                        filteredSearchOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No results found</p>
                    )}
                </div>
            </SelectContent>
        </ShadcnSelect>
    )
}
