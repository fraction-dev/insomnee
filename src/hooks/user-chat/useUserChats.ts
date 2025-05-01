import { useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'
import { UserChat } from '~/services/user-chat/model'
import { BaseResponse } from '~/types/response'

export const useUserChats = (organizationId: string, userId: string) => {
    return useQuery<BaseResponse<UserChat[]>>({
        queryKey: ['user-chats', organizationId, userId],
        queryFn: () => fetch('GET', API_ROUTES.ORGANIZATION.USER.CHAT_ASSISTANT(organizationId, userId)),
    })
}
