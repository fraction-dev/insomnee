import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { Dialog } from '~/services/messaging/model'
import { BaseResponse } from '~/types/response'

export const useInstagramDialogs = (organizationId: string) => {
    return useQuery<BaseResponse<Dialog[]>>({
        queryKey: ['instagram-dialogs', organizationId],
        queryFn: () => fetch('GET', `/organization/${organizationId}/dialogs/instagram`),
        refetchInterval: 10000, // 10 seconds (the execution of the endpoint is about 2-5 seconds)
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    })
}
