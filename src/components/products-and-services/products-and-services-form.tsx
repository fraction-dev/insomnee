import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCreateOrganizationProductAndService } from '~/hooks/organization-products-and-services/useCreateOrganizationProductAndService'
import { useUpdateOrganizationProductAndService } from '~/hooks/organization-products-and-services/useUpdateOrganizationProductAndService'
import { useSession } from '~/lib/auth-client'
import { CURRENCIES } from '~/lib/consts/currencies'
import { FileUpload } from '~/services/file-upload/model'
import { OrganizationProductsAndServices } from '~/services/organization-products-and-services/model'

import { FileInput } from '../shared/file-input'
import { FormField } from '../shared/form-field'
import { Select } from '../shared/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().min(1),
    currency: z.string(),
    websiteUrlLink: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface Props {
    productAndService?: OrganizationProductsAndServices
    organizationId: string
    onSubmit: () => void
}

export const ProductsAndServicesForm = ({ organizationId, productAndService, onSubmit }: Props) => {
    const { data: session } = useSession()

    const { mutate: createOrganizationProductAndService, isPending: isCreating } = useCreateOrganizationProductAndService(organizationId)
    const { mutate: updateOrganizationProductAndService, isPending: isUpdating } = useUpdateOrganizationProductAndService(organizationId)

    const isLoading = isCreating || isUpdating

    const [files, setFiles] = useState<FileUpload[]>(productAndService?.files ?? [])

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: productAndService?.name ?? '',
            description: productAndService?.description ?? '',
            price: productAndService?.price ?? 0,
            currency: productAndService?.currency ?? 'MDL',
            websiteUrlLink: productAndService?.websiteUrlLink ?? '',
        },
    })

    const handleSubmit = (data: FormData) => {
        if (productAndService) {
            updateOrganizationProductAndService(
                {
                    productAndServiceId: productAndService.id,
                    data: {
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        currency: data.currency,
                        files: files.map((file) => file.id),
                        websiteUrlLink: data.websiteUrlLink,
                    },
                },
                { onSuccess: () => onSubmit() },
            )
        } else {
            createOrganizationProductAndService(
                {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    currency: data.currency,
                    files: files.map((file) => file.id),
                    websiteUrlLink: data.websiteUrlLink,
                },
                { onSuccess: () => onSubmit() },
            )
        }
    }

    const handleUploadFiles = (fileUploads: FileUpload[]) => {
        setFiles([...files, ...fileUploads])
    }

    const handleRemoveFile = (fileId: string) => {
        const updatedFiles = files.filter((file) => file.id !== fileId)
        setFiles(updatedFiles)
    }

    return (
        <form className="pb-12 h-full" onSubmit={form.handleSubmit(handleSubmit)}>
            <Form {...form}>
                <div className="flex flex-col gap-8 pb-12 relative h-full overflow-hidden">
                    <FormField
                        isRequired
                        label="Name of the product or service"
                        control={form.control}
                        name="name"
                        errorMessage={form.formState.errors.name?.message}
                        render={(field) => (
                            <Input {...field} value={field.value as string} placeholder="Sony PlayStation 5 Slim Digital Edition" />
                        )}
                    />

                    <FormField
                        label="Website URL link"
                        control={form.control}
                        name="websiteUrlLink"
                        errorMessage={form.formState.errors.websiteUrlLink?.message}
                        render={(field) => (
                            <Input
                                {...field}
                                value={field.value as string}
                                placeholder="https://enter.online/for-gamers/console/sony-playstation-5-slim-digital-edition-white"
                            />
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4 items-start">
                        <FormField
                            isRequired
                            label="Price"
                            control={form.control}
                            name="price"
                            errorMessage={form.formState.errors.price?.message}
                            render={(field) => (
                                <Input
                                    {...field}
                                    value={field.value as string}
                                    placeholder="1000"
                                    type="number"
                                    onChange={(e) => {
                                        const value = e.target.value
                                        const numericValue = value.replace(/[^0-9]/g, '')
                                        field.onChange(Number(numericValue))
                                    }}
                                />
                            )}
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

                    <FormField
                        control={form.control}
                        name="description"
                        errorMessage={form.formState.errors.description?.message}
                        render={(field) => (
                            <Textarea
                                {...field}
                                value={field.value as string}
                                placeholder="A new PlayStation 5 Digital Edition console, available in 2 colors: black and white. In complete set with a controller, HDMI cable, power cable, and a user manual."
                                className="min-h-24"
                            />
                        )}
                    />

                    {session?.user && (
                        <Accordion collapsible type="single" defaultValue="files">
                            <AccordionItem value="files">
                                <AccordionTrigger className="text-base font-normal">Files</AccordionTrigger>
                                <AccordionContent>
                                    <FileInput
                                        multiple
                                        userId={session.user.id}
                                        accept={[
                                            'text/csv',
                                            'image/*',
                                            'application/json',
                                            'application/pdf',
                                            'application/vnd.ms-excel',
                                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                        ]}
                                        files={files}
                                        onUpload={handleUploadFiles}
                                        onFileRemove={handleRemoveFile}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    )}

                    <Button isLoading={isLoading} type="submit" className="absolute z-50 bottom-0 right-0 w-full">
                        Submit
                    </Button>
                </div>
            </Form>
        </form>
    )
}
