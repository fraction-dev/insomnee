import { useQuery } from '@tanstack/react-query'
import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'
import { Dialog } from '~/services/messaging/model'
import { BaseResponse } from '~/types/response'

export const useInstagramDialogs = (organizationId: string) => {
    return useQuery<BaseResponse<Dialog[]>>({
        queryKey: ['instagram-dialogs', organizationId],
        queryFn: () => fetch('GET', API_ROUTES.DIALOGS.INSTAGRAM.INDEX(organizationId)),
    })
}
