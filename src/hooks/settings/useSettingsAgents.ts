import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { SettingsAgentsOutput } from '~/services/settings/model'
import { BaseResponse } from '~/types/response'

export const useSettingsAgents = (organizationId: string) => {
    return useQuery<BaseResponse<SettingsAgentsOutput>>({
        queryKey: ['settings-agents', organizationId],
        queryFn: () => fetch('GET', `/organization/${organizationId}/settings/agents`),
    })
}
