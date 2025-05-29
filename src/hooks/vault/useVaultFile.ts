import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { FileUpload } from '~/services/file-upload/model'
import { BaseResponse } from '~/types/response'

export const useVaultFile = (
    organizationId: string,
    fileId: string,
    options?: Omit<UseQueryOptions<BaseResponse<FileUpload>>, 'queryKey' | 'queryFn'>,
) => {
    return useQuery<BaseResponse<FileUpload>>({
        queryKey: ['vault-file', organizationId, fileId],
        queryFn: () => fetch<BaseResponse<FileUpload>>('GET', `/organization/${organizationId}/vault/${fileId}`),
        ...options,
    })
}
