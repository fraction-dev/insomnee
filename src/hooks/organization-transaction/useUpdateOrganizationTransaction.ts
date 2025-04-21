import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'

const bodySchema = z.object({
    description: z.string().nullable(),
    notes: z.string().nullable(),
    categoryId: z.string().nullable(),
    amount: z.number().nullable(),
    currency: z.string().nullable(),
    assignedTo: z.string().nullable(),
})

export const useUpdateOrganizationTransaction = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ transactionId, body }: { transactionId: string; body: z.infer<typeof bodySchema> }) =>
            fetch('PATCH', API_ROUTES.ORGANIZATION_TRANSACTIONS.TRANSACTION(organizationId, transactionId), body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['organization-transactions', organizationId],
            })

            toast.success('Transaction updated successfully')
        },
    })
}
