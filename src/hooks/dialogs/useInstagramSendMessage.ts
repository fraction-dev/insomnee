import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'

export const useInstagramSendMessage = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: { recipientId: string; message: string }) =>
            fetch('POST', API_ROUTES.DIALOGS.INSTAGRAM.MESSAGE(organizationId), payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['instagram-dialogs', organizationId] })
        },
    })
}
