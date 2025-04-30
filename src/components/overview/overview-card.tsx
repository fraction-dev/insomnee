import { ReactNode } from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

interface Props {
    title: string | ReactNode
    value: string | ReactNode
    description?: string | ReactNode
    footerActions?: ReactNode
}

export const OverviewCard = ({ title, value, description, footerActions }: Props) => {
    return (
        <Card>
            <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-mono text-default font-light">{value}</CardTitle>
                <CardDescription className="text-sm text-default text-neutral-600 font-normal">{title}</CardDescription>
                {description && (
                    <CardDescription className="text-xs text-default text-neutral-400 font-normal leading-normal">
                        {description}
                    </CardDescription>
                )}
            </CardHeader>
            {footerActions && <CardFooter>{footerActions}</CardFooter>}
        </Card>
    )
}
