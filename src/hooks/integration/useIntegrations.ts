import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { Integration } from '~/services/integration/model'
import { BaseResponse } from '~/types/response'

export const useIntegrations = (organizationId: string) => {
    return useQuery<BaseResponse<Integration[]>>({
        queryKey: ['integrations', organizationId],
        queryFn: () => fetch('GET', `/organization/${organizationId}/integrations`),
    })
}
