import { useQuery } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { FileUpload } from '~/services/file-upload/model'
import { BaseResponse } from '~/types/response'

export const useVaultFiles = (organizationId: string) => {
    return useQuery({
        queryKey: ['vault-files', organizationId],
        queryFn: () => fetch<BaseResponse<FileUpload[]>>('GET', `/organization/${organizationId}/vault`),
    })
}
