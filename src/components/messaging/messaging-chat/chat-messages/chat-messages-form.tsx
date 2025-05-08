import { zodResolver } from '@hookform/resolvers/zod'
import { Sparkle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormField } from '~/components/shared/form-field'
import { Hint } from '~/components/shared/hint'
import { Button } from '~/components/ui/button'
import { Form } from '~/components/ui/form'
import { Textarea } from '~/components/ui/textarea'

interface Props {
    isLoading?: boolean
    onSubmit?: (message: string) => void
}

const formSchema = z.object({
    message: z.string().min(1, { message: 'Message is required' }),
})

type FormSchema = z.infer<typeof formSchema>

export const ChatMessagesForm = ({ isLoading, onSubmit }: Props) => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: '',
        },
    })

    const handleSubmit = (data: FormSchema) => {
        onSubmit?.(data.message)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="message"
                        render={(field) => (
                            <Textarea {...field} placeholder="Type a message..." className="min-h-24 resize-none placeholder:text-sm" />
                        )}
                    />
                    <div className="flex justify-end gap-2">
                        <div className="flex items-center gap-2">
                            <Hint content="Generate a response">
                                <Button variant="outline" size="icon">
                                    <Sparkle className="size-4" />
                                </Button>
                            </Hint>

                            <Button isLoading={isLoading} type="submit">
                                Send
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}
