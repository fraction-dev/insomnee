import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { Organization } from '~/services/organization/model'
import { BaseResponse } from '~/types/response'

export const useOrganization = (organizationId: string) => {
    return useQuery<BaseResponse<Organization>, Error>({
        queryKey: ['organization', organizationId],
        queryFn: () => fetch('GET', `/organization/${organizationId}`),
    })
}
