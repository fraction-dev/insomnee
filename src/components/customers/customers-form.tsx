import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCreateCustomer } from '~/hooks/customers/useCreateCustomer'
import { useUpdateCustomer } from '~/hooks/customers/useUpdateCustomer'
import { Customer, customerCreateSchema } from '~/services/customer/model'

import { FormField } from '../shared/form-field'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { Textarea } from '../ui/textarea'

type CustomerForm = z.infer<typeof customerCreateSchema>

interface Props {
    customer?: Customer
    organizationId: string
    onSuccess: () => void
}

export const CustomersForm = ({ customer, organizationId, onSuccess }: Props) => {
    const { mutate: createCustomer, isPending } = useCreateCustomer(organizationId)
    const { mutate: updateCustomer, isPending: isUpdating } = useUpdateCustomer(organizationId, customer?.id)

    const isLoading = isPending || isUpdating

    const form = useForm<CustomerForm>({
        resolver: zodResolver(customerCreateSchema),
        defaultValues: {
            name: customer?.name ?? '',
            email: customer?.email ?? '',
            websiteUrl: customer?.websiteUrl ?? '',
            contactPerson: customer?.contactPerson ?? '',
            phoneNumber: customer?.phoneNumber ?? '',
            country: customer?.country ?? '',
            city: customer?.city ?? '',
            notes: customer?.notes ?? '',
            vatNumber: customer?.vatNumber ?? '',
            state: customer?.state ?? '',
            zipCode: customer?.zipCode ?? '',
            addressLine1: customer?.addressLine1 ?? '',
            addressLine2: customer?.addressLine2 ?? '',
        },
    })

    const handleSubmit = (data: CustomerForm) => {
        if (customer?.id) {
            updateCustomer(
                {
                    id: customer.id,
                    name: data.name,
                    email: data.email,
                    websiteUrl: data.websiteUrl,
                    contactPerson: data.contactPerson,
                    phoneNumber: data.phoneNumber,
                    country: data.country,
                    city: data.city,
                    notes: data.notes,
                    vatNumber: data.vatNumber,
                    state: data.state,
                    zipCode: data.zipCode,
                    addressLine1: data.addressLine1,
                    addressLine2: data.addressLine2,
                    status: 'ACTIVE',
                },
                { onSuccess },
            )
        } else {
            createCustomer(
                {
                    name: data.name,
                    email: data.email,
                    websiteUrl: data.websiteUrl,
                    contactPerson: data.contactPerson,
                    phoneNumber: data.phoneNumber,
                    country: data.country,
                    city: data.city,
                    notes: data.notes,
                    vatNumber: data.vatNumber,
                    state: data.state,
                    zipCode: data.zipCode,
                    addressLine1: data.addressLine1,
                    addressLine2: data.addressLine2,
                },
                { onSuccess },
            )
        }
    }

    return (
        <Form {...form}>
            <form className="relative pb-12 h-full flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                    isRequired
                    label="Name"
                    control={form.control}
                    name="name"
                    errorMessage={form.formState.errors.name?.message}
                    render={(field) => <Input {...field} value={field.value as string} placeholder="John Doe" />}
                />

                <div className="grid grid-cols-2 gap-4 items-start">
                    <FormField
                        label="Email"
                        control={form.control}
                        name="email"
                        errorMessage={form.formState.errors.email?.message}
                        render={(field) => <Input {...field} value={field.value as string} placeholder="john.doe@example.com" />}
                    />

                    <FormField
                        label="Phone number"
                        control={form.control}
                        name="phoneNumber"
                        errorMessage={form.formState.errors.phoneNumber?.message}
                        render={(field) => <Input {...field} value={field.value as string} placeholder="1234567890" />}
                    />
                </div>

                <FormField
                    label="Website URL"
                    control={form.control}
                    name="websiteUrl"
                    errorMessage={form.formState.errors.websiteUrl?.message}
                    render={(field) => <Input {...field} value={field.value as string} placeholder="https://www.example.com" />}
                />

                <FormField
                    label="Contact person"
                    control={form.control}
                    name="contactPerson"
                    errorMessage={form.formState.errors.contactPerson?.message}
                    render={(field) => <Input {...field} value={field.value as string} placeholder="John Doe" />}
                />

                <Separator />

                <FormField
                    label="Address line 1"
                    control={form.control}
                    name="addressLine1"
                    errorMessage={form.formState.errors.addressLine1?.message}
                    render={(field) => <Input {...field} value={field.value as string} placeholder="123 Main St" />}
                />

                <FormField
                    label="Address line 2"
                    control={form.control}
                    name="addressLine1"
                    errorMessage={form.formState.errors.addressLine1?.message}
                    render={(field) => <Input {...field} value={field.value as string} placeholder="123 Main St" />}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="Country"
                        control={form.control}
                        name="country"
                        errorMessage={form.formState.errors.city?.message}
                        render={(field) => <Input {...field} value={field.value as string} placeholder="United States" />}
                    />

                    <FormField
                        label="City"
                        control={form.control}
                        name="city"
                        errorMessage={form.formState.errors.state?.message}
                        render={(field) => <Input {...field} value={field.value as string} placeholder="New York" />}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        label="State"
                        control={form.control}
                        name="state"
                        errorMessage={form.formState.errors.state?.message}
                        render={(field) => <Input {...field} value={field.value as string} placeholder="California" />}
                    />

                    <FormField
                        label="Zip code"
                        control={form.control}
                        name="zipCode"
                        errorMessage={form.formState.errors.zipCode?.message}
                        render={(field) => <Input {...field} value={field.value as string} placeholder="10001" />}
                    />
                </div>

                <Separator />

                <FormField
                    label="Notes"
                    control={form.control}
                    name="notes"
                    errorMessage={form.formState.errors.notes?.message}
                    render={(field) => <Textarea {...field} value={field.value as string} placeholder="Notes" className="h-24" />}
                />

                <Button isLoading={isLoading} type="submit" className="w-full absolute bottom-0 left-0 right-0">
                    {customer ? 'Update' : 'Create'}
                </Button>
            </form>
        </Form>
    )
}
