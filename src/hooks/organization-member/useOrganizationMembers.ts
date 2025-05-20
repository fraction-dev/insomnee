import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/fetch'
import { OrganizationMember } from '~/services/organization-member/model'
import { BaseResponse } from '~/types/response'

export const useOrganizationMembers = (organizationId: string) => {
    return useQuery<BaseResponse<OrganizationMember[]>>({
        queryKey: ['organization-members', organizationId],
        queryFn: () => fetch('GET', `/organization/${organizationId}/member`),
    })
}
