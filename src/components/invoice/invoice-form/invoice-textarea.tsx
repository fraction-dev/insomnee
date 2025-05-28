import { memo, TextareaHTMLAttributes, useEffect, useRef } from 'react'
import { Path, UseFormRegister } from 'react-hook-form'

import { Textarea } from '~/components/ui/textarea'
import { cn } from '~/lib/shared/utils'
import { InvoiceFormValues } from '~/services/invoice/model'

type FormFieldPath = Path<InvoiceFormValues>

export const InvoiceTextarea = memo(
    ({
        register,
        name,
        autoFocus,
        ...props
    }: {
        register: UseFormRegister<InvoiceFormValues>
        name: FormFieldPath
        autoFocus?: boolean
    } & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
        const textareaRef = useRef<HTMLTextAreaElement>(null)
        const { onChange, ...restRegister } = register(name as Path<InvoiceFormValues>)

        useEffect(() => {
            if (autoFocus && textareaRef.current) {
                textareaRef.current.focus()
            }
        }, [autoFocus])

        return (
            <Textarea
                {...restRegister}
                onChange={(e) => {
                    onChange(e)
                    props.onChange?.(e)
                }}
                {...props}
                ref={(e) => {
                    textareaRef.current = e
                    restRegister.ref?.(e)
                }}
                className={cn(props.className, 'resize-none bg-transparent border-none shadow-none p-0 w-full disabled:cursor-text')}
            />
        )
    },
)

InvoiceTextarea.displayName = 'InvoiceTextarea'
