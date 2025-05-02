import { useQuery } from '@tanstack/react-query'

import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'
import { SettingsAgentsOutput } from '~/services/settings/model'
import { BaseResponse } from '~/types/response'

export const useSettingsAgents = (organizationId: string) => {
    return useQuery<BaseResponse<SettingsAgentsOutput>>({
        queryKey: ['settings-agents', organizationId],
        queryFn: () => fetch('GET', API_ROUTES.ORGANIZATION.SETTINGS.AGENTS(organizationId)),
    })
}
