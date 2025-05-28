import { InputHTMLAttributes, memo } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

import { Input } from '~/components/ui/input'
import { cn } from '~/lib/shared/utils'
import { InvoiceFormValues } from '~/services/invoice/model'

type ArrayFieldPath<T extends FieldValues, K extends keyof T> =
    T[K] extends Array<infer U> ? `${K & string}.${number}.${keyof U & string}` : never
type FormFieldPath = Path<InvoiceFormValues> | ArrayFieldPath<InvoiceFormValues, 'items'>

export const InvoiceInput = memo(
    ({
        register,
        name,
        autoFocus,
        ...props
    }: {
        register: UseFormRegister<InvoiceFormValues>
        name: FormFieldPath
        autoFocus?: boolean
    } & InputHTMLAttributes<HTMLInputElement>) => (
        <Input
            {...register(name as Path<InvoiceFormValues>)}
            {...props}
            autoFocus={autoFocus}
            className={cn(props.className, 'bg-transparent border-none shadow-none p-0 h-full')}
        />
    ),
)

InvoiceInput.displayName = 'InvoiceInput'
