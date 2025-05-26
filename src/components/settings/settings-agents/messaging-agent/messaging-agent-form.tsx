import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { FormField } from '~/components/shared/form-field'
import { Button } from '~/components/ui/button'
import { Form } from '~/components/ui/form'
import { Separator } from '~/components/ui/separator'
import { Switch } from '~/components/ui/switch'
import { Textarea } from '~/components/ui/textarea'
import { useUpdateMessagingAgent } from '~/hooks/settings/useUpdateSettingMessagingAgent'
import { MessagingAgent } from '~/services/messaging-agent/model'

interface Props {
    organizationId: string
    agent: MessagingAgent
}

const formSchema = z.object({
    prompt: z.string().min(0),
    hasAccessToProductsAndServices: z.boolean(),
})

type FormSchema = z.infer<typeof formSchema>

export const MessagingAgentForm = ({ organizationId, agent }: Props) => {
    const { mutate: updateMessagingAgent, isPending } = useUpdateMessagingAgent(organizationId)

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: agent.prompt ?? '',
            hasAccessToProductsAndServices: agent.hasAccessToProductsAndServices,
        },
    })

    const onSubmit = (data: FormSchema) => {
        updateMessagingAgent({ agentId: agent.id, data }, { onSuccess: () => toast.success('Messaging agent updated successfully') })
    }

    useEffect(() => {
        if (form.getValues('hasAccessToProductsAndServices') !== agent.hasAccessToProductsAndServices) {
            onSubmit(form.getValues())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.watch('hasAccessToProductsAndServices')])

    return (
        <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    label=""
                    control={form.control}
                    name="prompt"
                    render={(field) => (
                        <Textarea
                            placeholder="Your rules here..."
                            className="max-h-96"
                            value={field.value as string}
                            onChange={field.onChange}
                        />
                    )}
                />

                <div className="flex items-center justify-end gap-2">
                    <Button isLoading={isPending} type="submit" variant="default" size="sm">
                        Update
                    </Button>
                </div>

                <Separator />

                <FormField
                    label=""
                    control={form.control}
                    name="hasAccessToProductsAndServices"
                    render={(field) => (
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-[12px] text-muted-foreground">
                                Allow agent to list and suggest items from your `Products & Services` table?
                            </p>

                            <Switch isLoading={isPending} checked={field.value as boolean} onCheckedChange={field.onChange} />
                        </div>
                    )}
                />
            </form>
        </Form>
    )
}
