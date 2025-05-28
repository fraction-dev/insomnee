import { InputHTMLAttributes, TextareaHTMLAttributes, useRef, useState } from 'react'

import { useOutsideClick } from '~/hooks/shared/useOutsideClick'
import { cn } from '~/lib/shared/utils'

import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

interface BaseProps {
    placeholderClassName?: string
    type?: 'input' | 'textarea'
}

type Props = BaseProps &
    (({ type?: 'input' } & InputHTMLAttributes<HTMLInputElement>) | ({ type: 'textarea' } & TextareaHTMLAttributes<HTMLTextAreaElement>))

export const InvoiceFormField = ({ placeholderClassName, type = 'input', ...props }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const ref = type === 'input' ? inputRef : textareaRef

    const [isTouched, setIsTouched] = useState(false)
    useOutsideClick(ref, () => {
        /**
         * Trigger only if input value is empty
         */
        if (type === 'input' && !props.value) {
            setIsTouched(false)
        }

        if (type === 'textarea' && !props.value) {
            setIsTouched(false)
        }
    })

    if (!isTouched) {
        return (
            <div
                className={cn(
                    'font-mono text-[11px] text-primary leading-[18px] invoice-editor w-full bg-[repeating-linear-gradient(-60deg,#DBDBDB,#DBDBDB_1px,transparent_1px,transparent_5px)] dark:bg-[repeating-linear-gradient(-60deg,#2C2C2C,#2C2C2C_1px,transparent_1px,transparent_5px)] min-h-[90px] [&>div]:min-h-[90px]',
                    placeholderClassName,
                )}
                onClick={() => setIsTouched(true)}
            />
        )
    }

    if (type === 'input') {
        return (
            <Input
                ref={inputRef}
                {...(props as InputHTMLAttributes<HTMLInputElement>)}
                className={cn('')}
                onBlur={() => setIsTouched(true)}
            />
        )
    }

    return (
        <Textarea
            ref={textareaRef}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={cn('')}
            onBlur={() => setIsTouched(true)}
        />
    )
}
