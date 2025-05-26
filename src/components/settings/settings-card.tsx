import { PropsWithChildren, ReactNode } from 'react'
import { FaInstagram } from 'react-icons/fa'

import { IntegrationType } from '~/services/integration/model'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'

interface Props {
    isLoading?: boolean
    type?: IntegrationType
    title: string
    description?: string | ReactNode
    rightHeaderContent?: ReactNode
    footer?: ReactNode
}

export const SettingsCard = ({ type, title, description, rightHeaderContent, footer, children, isLoading }: PropsWithChildren<Props>) => {
    if (isLoading) {
        return <Skeleton className="h-96 w-full" />
    }

    const getIntegrationTypeIcon = () => {
        switch (type) {
            case 'INSTAGRAM':
                return <FaInstagram className="size-5" />

            default:
                return null
        }
    }

    return (
        <Card>
            <CardHeader className="flex items-center justify-between gap-12">
                <div className="flex flex-col gap-2 max-w-sm">
                    {getIntegrationTypeIcon()}

                    <CardTitle className="font-medium text-base">{title}</CardTitle>
                    {description && (
                        <CardDescription className="text-xs text-muted-foreground leading-relaxed font-normal">
                            {description}
                        </CardDescription>
                    )}
                </div>

                {rightHeaderContent && <div className="ml-auto">{rightHeaderContent}</div>}
            </CardHeader>

            {children && <CardContent>{children}</CardContent>}

            {footer && (
                <>
                    <Separator />
                    <CardFooter>{footer}</CardFooter>
                </>
            )}
        </Card>
    )
}
