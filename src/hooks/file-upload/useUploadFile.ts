import { useMutation } from '@tanstack/react-query'

import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'
import { FileUpload } from '~/services/file-upload/model'
import { BaseResponse } from '~/types/response'

export const useUploadFile = (userId: string | undefined) => {
    if (!userId) {
        throw new Error('User ID is required in [useUploadFile] hook')
    }

    return useMutation<BaseResponse<FileUpload>, Error, FormData>({
        mutationFn: (formData: FormData) => fetch('POST', API_ROUTES.FILE_UPLOAD.UPLOAD(userId), formData),
    })
}
