import Link from 'next/link'

import { pluralize } from '~/lib/strings'

import { Button } from '../ui/button'

interface Props {
    type: 'invoice' | 'customer' | 'transaction'
    title?: string
    description?: string
    href: string
}

export const EmptyDataState = ({ type, title, description, href }: Props) => {
    return (
        <div className="flex flex-col gap-4 justify-center items-center py-24">
            <div className="flex flex-col gap-2 items-center">
                <h3 className="text-base font-medium">{title ?? `No ${pluralize(type)}`}</h3>
                <p className="text-muted-foreground max-w-72 mx-auto leading-relaxed text-center text-sm font-light">
                    {description ?? `You haven't created any ${type} yet. Go ahead and create your first one.`}
                </p>
            </div>

            <Link href={href}>
                <Button variant="outline" size="sm" className="font-normal">
                    {`Create ${type}`}
                </Button>
            </Link>
        </div>
    )
}
