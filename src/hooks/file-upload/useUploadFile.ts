import { useMutation } from '@tanstack/react-query'

import { fetch } from '~/lib/fetch'
import { FileUpload } from '~/services/file-upload/model'
import { BaseResponse } from '~/types/response'

export const useUploadFile = (userId: string | undefined) => {
    return useMutation<BaseResponse<FileUpload | null>, Error, FormData>({
        mutationFn: (formData: FormData) =>
            userId ? fetch('POST', `/user/${userId}/file-upload`, formData) : Promise.resolve({ data: null }),
    })
}
