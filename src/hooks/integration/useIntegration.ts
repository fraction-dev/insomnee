import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { Integration } from '~/services/integration/model'

export const useIntegration = (organizationId: string, integrationId: string) => {
    return useQuery<Integration>({
        queryKey: ['integration', organizationId, integrationId],
        queryFn: () => fetch('GET', `/organization/${organizationId}/integration/${integrationId}`),
    })
}
