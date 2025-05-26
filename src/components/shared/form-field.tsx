import { ReactNode } from 'react'
import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

import { cn } from '~/lib/shared/utils'

import { FormControl, FormItem, FormLabel, FormMessage, FormField as ShadcnFormField } from '../ui/form'

interface Props<T extends FieldValues> {
    isRequired?: boolean
    label?: string
    control: Control<T>
    name: Path<T>
    errorMessage?: string
    render: (field: ControllerRenderProps<T, Path<T>>) => ReactNode
}

export const FormField = <T extends FieldValues>({ label, control, name, render, errorMessage, isRequired = false }: Props<T>) => {
    return (
        <ShadcnFormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && (
                        <FormLabel
                            className={cn('text-xs font-light text-muted-foreground', {
                                'flex items-center gap-1': isRequired,
                            })}
                        >
                            {label}
                            {isRequired && <span className="text-destructive">*</span>}
                        </FormLabel>
                    )}
                    <FormControl>{render(field)}</FormControl>
                    {errorMessage && <FormMessage className="text-xs">{errorMessage}</FormMessage>}
                </FormItem>
            )}
        />
    )
}
