import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '~/components/ui/button'
import { Form } from '~/components/ui/form'
import { useCreateInvoice } from '~/hooks/invoice/useCreateInvoice'
import { useUpdateInvoice } from '~/hooks/invoice/useUpdateInvoice'
import { useSheet } from '~/hooks/shared/useSheet'
import { Customer } from '~/services/customer/model'
import { createInvoiceSchema, Invoice, InvoiceFormValues } from '~/services/invoice/model'

import { InvoiceAddresses } from './invoice-addresses'
import { InvoiceFooter } from './invoice-footer'
import { InvoiceHeader } from './invoice-header'
import { InvoiceItems } from './invoice-items'

interface Props {
    organizationId: string
    invoice?: Invoice
    customers: Customer[]
}

export const InvoiceForm = ({ organizationId, invoice, customers }: Props) => {
    const { handleCleanQueryParams } = useSheet('invoice')
    const { mutate: createInvoice, isPending: isCreatingInvoice } = useCreateInvoice(organizationId)
    const { mutate: updateInvoice, isPending: isUpdatingInvoice } = useUpdateInvoice(organizationId)

    const isLoading = isCreatingInvoice || isUpdatingInvoice

    const form = useForm<InvoiceFormValues>({
        resolver: zodResolver(createInvoiceSchema),
        defaultValues: {
            title: invoice?.title ?? 'Invoice',
            number: invoice?.number ?? '',
            imageUrl: invoice?.imageUrl ?? '',
            dateFormat: invoice?.dateFormat ?? 'DD/MM/YYYY',
            currency: invoice?.currency ?? 'USD',
            issueDate: dayjs(invoice?.issueDate ?? new Date()).toISOString(),
            dueDate: dayjs(invoice?.dueDate ?? new Date()).toISOString(),
            from: invoice?.from ?? '',
            customerId: invoice?.customer?.id ?? '',
            items: invoice?.items ?? [{ description: '', quantity: 0, price: 0 }],
            discount: invoice?.discount ?? 0,
            vat: invoice?.vat ?? 0,
            tax: invoice?.tax ?? 0,
            paymentDetails: invoice?.paymentDetails ?? '',
            notes: invoice?.notes ?? '',
            status: invoice?.status ?? 'DRAFT',
        },
    })

    const onSubmit = useCallback((data: InvoiceFormValues) => {
        const payload = {
            ...(invoice?.id ? { id: invoice.id } : {}),
            number: data.number,
            title: data.title,
            imageUrl: data.imageUrl ?? null,
            dateFormat: data.dateFormat ?? 'DD/MM/YYYY',
            currency: data.currency,
            issueDate: dayjs(data.issueDate).toDate(),
            dueDate: dayjs(data.dueDate).toDate(),
            from: data.from,
            customerId: data.customerId,
            items: data.items.map((item) => ({
                description: item.description ?? '',
                quantity: item.quantity,
                price: item.price,
            })),
            discount: data.discount ?? 0,
            vat: data.vat ?? 0,
            tax: data.tax ?? 0,
            paymentDetails: data.paymentDetails ?? null,
            notes: data.notes ?? null,
        }

        const onSuccess = () => {
            handleCleanQueryParams()
            toast.success(invoice?.id ? 'Invoice updated successfully' : 'Invoice created successfully')
        }

        if (invoice?.id) {
            updateInvoice(payload, { onSuccess })
        } else {
            createInvoice(payload, { onSuccess })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-12 relative">
                    <div className="flex flex-col gap-6">
                        <InvoiceHeader />
                        <InvoiceAddresses customers={customers} />
                        <InvoiceItems />
                    </div>

                    <InvoiceFooter />
                </div>

                <Button
                    isLoading={isLoading}
                    disabled={!form.formState.isValid}
                    className="w-fit absolute bottom-0 right-0 font-mono text-xs"
                >
                    {invoice?.id ? 'Update' : 'Create'}
                </Button>
            </form>
        </Form>
    )
}

InvoiceForm.displayName = 'InvoiceForm'
