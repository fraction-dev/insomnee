'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { CustomersSheet } from '~/components/customers/customers-sheet'
import { CustomersTable } from '~/components/customers/customers-table/customers-table'
import { TableHeader } from '~/components/table/table-header'
import { Skeleton } from '~/components/ui/skeleton'
import { ROUTES } from '~/config/routes'
import { useArchiveCustomers } from '~/hooks/customers/useArchiveCustomers'
import { useCustomers } from '~/hooks/customers/useCustomers'
import { useCustomersSheet } from '~/hooks/customers/useCustomersSheet'
import { Customer } from '~/services/customer/model'

interface Props {
    organizationId: string
}

export const CustomersView = ({ organizationId }: Props) => {
    const router = useRouter()
    const { data: customers, isLoading } = useCustomers(organizationId)
    const { isSheetOpen, handleCleanQueryParams, customerId } = useCustomersSheet()
    const { mutate: archiveCustomers, isPending: isArchivingCustomers } = useArchiveCustomers(organizationId)

    const [selectedRows, setSelectedRows] = useState<Customer[]>([])
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const onCreateBtnClick = () => {
        router.push(`${ROUTES.DASHBOARD.CUSTOMERS(organizationId)}?isCreateNew=true`)
    }

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-end">
                    <Skeleton className="size-10" />
                </div>
                <Skeleton className="h-96 w-full" />
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <TableHeader<Customer>
                    isDeleteDialogOpen={isDeleteDialogOpen}
                    setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                    selectedRows={selectedRows}
                    isDeleteLoading={isArchivingCustomers}
                    deleteDialogTitle="Are you sure to archive these customers?"
                    deleteDialogDescription="This action cannot be undone. This will permanently archive your customers."
                    handleDelete={() => {
                        archiveCustomers(
                            selectedRows.map((row) => row.id),
                            {
                                onSuccess: () => {
                                    setSelectedRows([])
                                    setIsDeleteDialogOpen(false)
                                },
                            },
                        )
                    }}
                    onCreateBtnClick={onCreateBtnClick}
                />
                <CustomersTable
                    organizationId={organizationId}
                    customers={customers?.data ?? []}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                />
            </div>

            <CustomersSheet
                customer={customers?.data?.find((customer) => customer.id === customerId)}
                organizationId={organizationId}
                isOpen={isSheetOpen}
                onClose={handleCleanQueryParams}
            />
        </>
    )
}
