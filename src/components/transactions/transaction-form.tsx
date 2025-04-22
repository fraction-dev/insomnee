import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAddFileToTransaction } from '~/hooks/organization-transaction/useAddFileToTransaction'
import { useCreateOrganizationTransaction } from '~/hooks/organization-transaction/useCreateOrganizationTransaction'
import { useRemoveFileFromTransaction } from '~/hooks/organization-transaction/useRemoveFileFromTransaction'
import { useUpdateOrganizationTransaction } from '~/hooks/organization-transaction/useUpdateOrganizationTransaction'
import { useSession } from '~/lib/auth-client'
import { CURRENCIES } from '~/lib/consts/currencies'
import { cn } from '~/lib/utils'
import { FileUpload } from '~/services/file-upload/model'
import { OrganizationMember } from '~/services/organization-member/model'
import { formatOrganizationTransactionCategoryType } from '~/services/organization-transaction-category/lib/formatOrganizationTransactionCategoryType'
import { OrganizationTransactionCategory } from '~/services/organization-transaction-category/model'
import { OrganizationTransaction } from '~/services/organization-transaction/model'

import { FileInput } from '../shared/file-input'
import { FormField } from '../shared/form-field'
import { Select } from '../shared/select'
import { UserCard } from '../shared/user-card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const transactionSchema = z.object({
    description: z.string().min(1),
    amount: z.coerce.number().min(1),
    currency: z.string().min(1),
    date: z.string().optional(),
    notes: z.string().optional(),
    categoryId: z.string().min(1),
    assignedTo: z.string().min(1),
})

interface Props {
    organizationId: string
    transaction?: OrganizationTransaction
    transactionCategories: OrganizationTransactionCategory[]
    transactions: OrganizationTransaction[]
    organizationMembers: OrganizationMember[]
    onSubmit: () => void
}

type TransactionForm = z.infer<typeof transactionSchema>

export const TransactionForm = ({ organizationId, transaction, transactionCategories, organizationMembers, onSubmit }: Props) => {
    const { data: session } = useSession()

    const { mutate: createTransaction, isPending: isCreating } = useCreateOrganizationTransaction(organizationId)
    const { mutate: updateTransaction, isPending: isUpdating } = useUpdateOrganizationTransaction(organizationId)
    const { mutate: addFileToTransaction } = useAddFileToTransaction(organizationId, transaction?.id)
    const { mutate: removeFileFromTransaction } = useRemoveFileFromTransaction(organizationId, transaction?.id)

    const isLoading = isCreating || isUpdating

    const form = useForm<TransactionForm>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            description: transaction?.description ?? '',
            amount: transaction?.amount ?? 0,
            currency: transaction?.currency ?? 'MDL',
            notes: transaction?.notes ?? '',
            categoryId: transaction?.category.id ?? '',
            assignedTo: transaction?.assignedTo?.id ?? organizationMembers[0].userId,
        },
    })

    const handleSubmit = async (data: TransactionForm) => {
        if (transaction) {
            return updateTransaction(
                {
                    transactionId: transaction.id,
                    body: {
                        description: data.description,
                        notes: data.notes ?? null,
                        categoryId: data.categoryId,
                        amount: data.amount,
                        currency: data.currency,
                        assignedTo: data.assignedTo ?? null,
                    },
                },
                {
                    onSuccess: () => {
                        form.reset()
                        onSubmit()
                    },
                },
            )
        }

        return createTransaction(
            {
                ...data,
                date: new Date(),
                assignedTo: data.assignedTo,
                attachmentUrl: null,
                notes: data.notes ?? null,
                amount: Number(data.amount),
                files: [],
            },
            {
                onSuccess: () => {
                    form.reset()
                    onSubmit()
                },
            },
        )
    }

    const handleUploadFile = (file: FileUpload) => {
        addFileToTransaction(file.id)
    }

    const handleRemoveFile = (fileId: string) => {
        removeFileFromTransaction(fileId)
    }

    return (
        <form className="relative pb-12 h-full" onSubmit={form.handleSubmit(handleSubmit)}>
            <Form {...form}>
                <div className="flex flex-col gap-8">
                    {!transaction && (
                        <FormField
                            isRequired
                            label="Description"
                            control={form.control}
                            name="description"
                            errorMessage={form.formState.errors.description?.message}
                            render={(field) => <Input {...field} placeholder="Acme Inc." />}
                        />
                    )}

                    {!transaction && (
                        <div className="grid grid-cols-2 gap-4 items-start">
                            <FormField
                                isRequired
                                label="Amount"
                                control={form.control}
                                name="amount"
                                errorMessage={form.formState.errors.amount?.message}
                                render={(field) => <Input {...field} type="number" placeholder="100" />}
                            />

                            <FormField
                                isRequired
                                label="Currency"
                                control={form.control}
                                name="currency"
                                errorMessage={form.formState.errors.currency?.message}
                                render={(field) => (
                                    <Select
                                        options={CURRENCIES.map((currency) => ({
                                            label: currency.code,
                                            value: currency.code,
                                        }))}
                                        value={field.value?.toString()}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 items-start">
                        <FormField
                            isRequired
                            label="Category"
                            control={form.control}
                            name="categoryId"
                            errorMessage={form.formState.errors.categoryId?.message}
                            render={(field) => (
                                <Select
                                    placeholder="Select category"
                                    options={transactionCategories.map((category) => ({
                                        label: (
                                            <div className="flex items-center gap-2">
                                                <div className={cn(`w-2 h-2 rounded-xs`)} style={{ backgroundColor: category.color }} />

                                                {formatOrganizationTransactionCategoryType(category.type)}
                                            </div>
                                        ),
                                        value: category.id,
                                    }))}
                                    value={typeof field.value === 'string' ? field.value : field.value?.toString()}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <FormField
                            isRequired
                            label="Assigned to"
                            control={form.control}
                            name="assignedTo"
                            errorMessage={form.formState.errors.assignedTo?.message}
                            render={(field) => (
                                <Select
                                    placeholder="Select member"
                                    options={organizationMembers.map((member) => ({
                                        label: <UserCard image={member.image} name={member.fullName} />,
                                        value: member.userId,
                                    }))}
                                    value={typeof field.value === 'string' ? field.value : field.value?.toString()}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        {session?.user.id && (
                            <Accordion collapsible type="single" defaultValue="attachments">
                                <AccordionItem value="attachments">
                                    <AccordionTrigger className="text-base font-normal">Attachments</AccordionTrigger>
                                    <AccordionContent>
                                        <FileInput
                                            userId={session.user.id}
                                            accept={['image/*']}
                                            files={transaction?.files}
                                            onUpload={handleUploadFile}
                                            onFileRemove={handleRemoveFile}
                                        />
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        )}

                        <Accordion collapsible type="single">
                            <AccordionItem value="notes">
                                <AccordionTrigger className="text-base font-normal">Notes</AccordionTrigger>
                                <AccordionContent>
                                    <Textarea {...form.register('notes')} placeholder="Notes" className="min-h-40" />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </Form>

            <Button isLoading={isLoading} type="submit" className="absolute bottom-0 right-0 w-full">
                {transaction ? 'Update' : 'Create'}
            </Button>
        </form>
    )
}
