import { PlusIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'

import { ROUTES } from '~/config/routes'
import { useCreateQueryString } from '~/hooks/shared/useCreateQueryString'
import { Customer } from '~/services/customer/model'

import { Button } from '../ui/button'

interface Props {
    organizationId: string
    selectedRows: Customer[]
}

export const CustomersHeader = ({ organizationId, selectedRows }: Props) => {
    const { createQueryString } = useCreateQueryString()

    return (
        <div className="flex justify-end items-center">
            {selectedRows.length > 0 ? (
                <Button size="icon" variant="destructive">
                    <TrashIcon />
                </Button>
            ) : (
                <Link href={`${ROUTES.DASHBOARD.CUSTOMERS(organizationId)}?${createQueryString('isCreateNew', 'true')}`}>
                    <Button size="icon" variant="outline">
                        <PlusIcon />
                    </Button>
                </Link>
            )}
        </div>
    )
}
