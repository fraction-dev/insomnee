import { Select as ShadcnSelect,SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface Props {
    options: { label: string; value: string }[]
    value: string | undefined
    placeholder?: string
    onChange: (value: string) => void
}

export const Select = ({ options, value, onChange, placeholder }: Props) => {
    return (
        <ShadcnSelect value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </ShadcnSelect>
    )
}
