import { Download, Loader2, X } from 'lucide-react'
import Image from 'next/image'
import { ChangeEvent, useRef } from 'react'

import { useUploadFile } from '~/hooks/file-upload/useUploadFile'
import { formatFileSize } from '~/lib/formatFileSize'
import { FileUpload } from '~/services/file-upload/model'

import { Button } from '../ui/button'

interface Props {
    userId: string
    accept?: string[]
    files?: FileUpload[]
    onUpload: (file: FileUpload) => void
    onFileRemove: (fileId: string) => void
}

export const FileInput = ({ userId, accept, files = [], onUpload, onFileRemove }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { mutate: uploadFile, isPending: isUploading } = useUploadFile(userId)

    const handleClick = () => {
        inputRef.current?.click()
    }

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.append('file', file)

            uploadFile(formData, {
                onSuccess: (fileUpload) => {
                    if (fileUpload.data) {
                        onUpload(fileUpload.data)
                    }
                },
            })
        }
    }

    const handleDownloadFile = (fileId: string) => {
        const file = files.find((file) => file.id === fileId)
        if (file) {
            window.open(file.url, '_blank')
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div
                className="min-h-42 p-12 text-center gap-1.5 rounded-xs border border-dashed border-border flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={handleClick}
            >
                {isUploading ? (
                    <Loader2 className="size-4 animate-spin" />
                ) : (
                    <>
                        <p className="text-xs text-muted-foreground">
                            Drop your files here, or <span className="underline">click to browse.</span>
                        </p>
                        <p className="text-xs text-muted-foreground">Maximum file size is 10MB</p>

                        <input ref={inputRef} type="file" className="hidden" accept={accept?.join(',')} onChange={handleChange} />
                    </>
                )}
            </div>

            <div className="flex flex-col gap-2">
                {files.map((file) => (
                    <div key={file.id} className="flex items-center gap-2 justify-between w-full">
                        <div className="flex items-center gap-2">
                            <Image src={file.url} alt={file.name} width={40} height={40} className="rounded-xs" />
                            <div className="flex flex-col gap-1">
                                <p className="text-sm">{file.name}</p>
                                <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-4"
                                onClick={() => handleDownloadFile(file.id)}
                            >
                                <Download className="size-4 text-muted-foreground" />
                            </Button>

                            <Button type="button" variant="ghost" size="icon" className="size-4" onClick={() => onFileRemove(file.id)}>
                                <X className="size-4 text-muted-foreground" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
