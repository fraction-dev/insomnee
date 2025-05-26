import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { OrganizationMember } from '~/services/organization/model'
import { BaseResponse } from '~/types/response'

export const useOrganizationMembers = (organizationId: string) => {
    return useQuery<BaseResponse<OrganizationMember[]>>({
        queryKey: ['organization-members', organizationId],
        queryFn: () => fetch('GET', `/organization/${organizationId}/member`),
    })
}
