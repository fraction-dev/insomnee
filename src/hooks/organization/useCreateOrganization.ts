import { useMutation } from '@tanstack/react-query'

import { fetch } from '~/lib/fetch'
import { Organization } from '~/services/organization/model'
import { BaseResponse } from '~/types/response'

interface Body {
    name: string
    defaultLanguage: string
    defaultCurrency: string
    phone: string
    websiteUrl: string
}

export const useCreateOrganization = () => {
    return useMutation<BaseResponse<Organization>, Error, Body>({
        mutationFn: (body) => fetch('POST', `/organization`, body),
    })
}
