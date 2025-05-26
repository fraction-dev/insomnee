import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'

export const useInstagramSendMessage = (organizationId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: { recipientId: string; message: string }) =>
            fetch('POST', `/organization/${organizationId}/dialogs/instagram/message`, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['instagram-dialogs', organizationId] })
        },
    })
}
