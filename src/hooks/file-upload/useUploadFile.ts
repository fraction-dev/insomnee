import { useMutation } from '@tanstack/react-query'

import { useSession } from '~/lib/shared/auth-client'
import { fetch } from '~/lib/shared/fetch'
import { FileUpload } from '~/services/file-upload/model'
import { BaseResponse } from '~/types/response'

export const useUploadFile = () => {
    const { data: session } = useSession()

    return useMutation<BaseResponse<FileUpload | null>, Error, FormData>({
        mutationFn: (formData: FormData) =>
            session?.user?.id ? fetch('POST', `/user/${session.user.id}/file-upload`, formData) : Promise.resolve({ data: null }),
    })
}
