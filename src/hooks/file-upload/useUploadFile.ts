import { useMutation } from '@tanstack/react-query'

import { API_ROUTES } from '~/config/api-routes'
import { fetch } from '~/lib/fetch'
import { FileUpload } from '~/services/file-upload/model'
import { BaseResponse } from '~/types/response'

export const useUploadFile = (userId: string | undefined) => {
    return useMutation<BaseResponse<FileUpload | null>, Error, FormData>({
        mutationFn: (formData: FormData) =>
            userId ? fetch('POST', API_ROUTES.FILE_UPLOAD.UPLOAD(userId), formData) : Promise.resolve({ data: null }),
    })
}
