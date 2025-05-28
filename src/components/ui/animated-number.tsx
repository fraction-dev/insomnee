'use client'

import NumberFlow from '@number-flow/react'

type Props = {
    value: number
    currency: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
}

export function AnimatedNumber({ value, currency, minimumFractionDigits, maximumFractionDigits }: Props) {
    return (
        <NumberFlow
            willChange
            value={value}
            format={{
                style: 'currency',
                currency: currency ?? 'USD',
                minimumFractionDigits,
                maximumFractionDigits,
            }}
        />
    )
}
