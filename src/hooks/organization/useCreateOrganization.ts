import { useMutation } from '@tanstack/react-query'

import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'
import { Organization } from '~/services/organization/model'
import { BaseResponse } from '~/types/response'

interface Body {
    name: string
    defaultLanguage: string
    defaultCurrency: string
    phone: string
}

export const useCreateOrganization = () => {
    return useMutation<BaseResponse<Organization>, Error, Body>({
        mutationFn: (body) => fetch('POST', API_ROUTES.ORGANIZATION.INDEX, body),
    })
}
