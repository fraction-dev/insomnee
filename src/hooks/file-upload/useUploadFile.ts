import { useMutation } from '@tanstack/react-query'

import { fetch } from '~/lib/shared/fetch'
import { FileUpload } from '~/services/file-upload/model'
import { BaseResponse } from '~/types/response'

export const useUploadFile = (organizationId: string) => {
    return useMutation<BaseResponse<FileUpload | null>, Error, { formData: FormData; accessType: 'PUBLIC' | 'PRIVATE' }>({
        mutationFn: ({ formData, accessType }: { formData: FormData; accessType: 'PUBLIC' | 'PRIVATE' }) =>
            fetch('POST', `/organization/${organizationId}/file-upload?accessType=${accessType}`, formData),
    })
}
