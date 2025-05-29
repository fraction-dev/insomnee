import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { useUploadFile } from '~/hooks/file-upload/useUploadFile'
import { SUPPORTED_FILE_MIME_TYPES } from '~/services/file-upload/consts'

import { Button } from '../ui/button'

interface Props {
    organizationId: string
}

export const VaultEmptyState = ({ organizationId }: Props) => {
    const queryClient = useQueryClient()
    const ref = useRef<HTMLInputElement>(null)
    const { mutate: uploadFiles } = useUploadFile(organizationId)

    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        if (isUploading) {
            toast.loading('Uploading files...')
        } else {
            toast.dismiss()
        }

        return () => {
            toast.dismiss()
        }
    }, [isUploading])

    const handleFileUpload = async (files: FileList | null) => {
        if (!files) return

        setIsUploading(true)

        await Promise.all(
            Array.from(files).map((file) => {
                const formData = new FormData()
                formData.append('file', file)
                uploadFiles(
                    { formData, accessType: 'PUBLIC' },
                    { onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vault-files'] }) },
                )
            }),
        )

        queryClient.invalidateQueries({ queryKey: ['vault-files'] })
        setIsUploading(false)
    }

    const handleUploadClick = () => {
        ref.current?.click()
    }

    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center py-24 max-w-80 mx-auto">
                <div className="flex flex-col gap-2 items-center">
                    <h3 className="text-base font-medium">Always find what you need</h3>
                    <p className="text-muted-foreground/70 mx-auto leading-relaxed text-center text-sm font-light">
                        Drag & drop or upload your documents. We'll automatically organize them with tags based on content, making them easy
                        and secure to find.
                    </p>
                </div>

                <Button variant="outline" size="sm" className="font-normal w-full" onClick={handleUploadClick}>
                    Upload files
                </Button>
            </div>

            <input
                ref={ref}
                multiple
                type="file"
                className="hidden"
                accept={SUPPORTED_FILE_MIME_TYPES.join(',')}
                onChange={(e) => handleFileUpload(e.target.files ?? null)}
            />
        </>
    )
}
