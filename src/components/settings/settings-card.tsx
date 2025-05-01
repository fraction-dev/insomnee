import { PropsWithChildren, ReactNode } from 'react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'

interface Props {
    title: string
    description?: string
    rightHeaderContent?: ReactNode
    footer?: ReactNode
}

export const SettingsCard = ({ title, description, rightHeaderContent, footer, children }: PropsWithChildren<Props>) => {
    return (
        <Card>
            <CardHeader className="flex items-center justify-between gap-12">
                <div className="flex flex-col gap-2 max-w-sm">
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
