import {
    AlertCircleIcon,
    FileArchiveIcon,
    FileIcon,
    FileSpreadsheetIcon,
    FileTextIcon,
    FileUpIcon,
    HeadphonesIcon,
    ImageIcon,
    VideoIcon,
    XIcon,
} from 'lucide-react'
import { useState } from 'react'

import logger from '~/core/logger'
import { useUploadFile } from '~/hooks/file-upload/useUploadFile'
import { formatBytes, useFileUpload } from '~/hooks/shared/use-file-upload'
import { FileUpload } from '~/services/file-upload/model'

import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

interface Props {
    multiple?: boolean
    userId: string
    accept?: string[]
    files?: FileUpload[]
    maxFiles?: number
    maxSize?: number
    initialFiles?: FileUpload[]
    onUpload: (fileUploads: FileUpload[]) => void
    onFileRemove: (fileId: string) => void
}

const getFileIcon = (file: FileUpload) => {
    const fileType = file.type
    const fileName = file.name

    if (
        fileType.includes('pdf') ||
        fileName.endsWith('.pdf') ||
        fileType.includes('word') ||
        fileName.endsWith('.doc') ||
        fileName.endsWith('.docx')
    ) {
        return <FileTextIcon className="size-4 opacity-60" />
    } else if (fileType.includes('zip') || fileType.includes('archive') || fileName.endsWith('.zip') || fileName.endsWith('.rar')) {
        return <FileArchiveIcon className="size-4 opacity-60" />
    } else if (fileType.includes('excel') || fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
        return <FileSpreadsheetIcon className="size-4 opacity-60" />
    } else if (fileType.includes('video/')) {
        return <VideoIcon className="size-4 opacity-60" />
    } else if (fileType.includes('audio/')) {
        return <HeadphonesIcon className="size-4 opacity-60" />
    } else if (fileType.startsWith('image/')) {
        return <ImageIcon className="size-4 opacity-60" />
    }
    return <FileIcon className="size-4 opacity-60" />
}

const MAX_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_FILES = 10

export const FileInput = ({
    userId,
    accept,
    files = [],
    onUpload,
    onFileRemove,
    multiple = false,
    maxFiles = MAX_FILES,
    maxSize = MAX_SIZE,
}: Props) => {
    const { mutate: uploadFile, isPending: isUploading } = useUploadFile(userId)
    const [processingFilesCount, setProcessingFilesCount] = useState(0)

    const [
        { isDragging, errors },
        { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, getInputProps },
    ] = useFileUpload({
        initialFiles: files,
        multiple,
        maxFiles,
        maxSize,
        accept: accept?.join(','),
        onFilesAdded: (addedFiles) => {
            // Handle files sequentially to ensure they all upload properly
            if (addedFiles.length === 0) return

            // Process files one by one to avoid race conditions
            const processFiles = async () => {
                const uploadedFiles: FileUpload[] = []

                for (const previewFile of addedFiles) {
                    const file = previewFile.file
                    if (file instanceof File) {
                        const formData = new FormData()
                        formData.append('file', file)

                        try {
                            // Create a promise for this file upload
                            const result = await new Promise<any>((resolve, reject) => {
                                uploadFile(formData, {
                                    onSuccess: (response) => {
                                        resolve(response)
                                    },
                                    onError: (error) => {
                                        reject(error)
                                    },
                                    onSettled: () => {
                                        setProcessingFilesCount((prev) => prev + 1)
                                    },
                                })
                            })

                            if (result && result.data) {
                                uploadedFiles.push(result.data)
                            }
                        } catch (error) {
                            logger.error('Error uploading file:', {
                                error,
                            })
                        }
                    }
                }

                if (uploadedFiles.length > 0) {
                    onUpload(uploadedFiles)
                }
            }

            // Start processing files
            processFiles()
        },
    })

    const handleRemoveFile = (fileId: string) => {
        removeFile(fileId)
        onFileRemove(fileId)
    }

    return (
        <div className="flex flex-col gap-2">
            <div
                role="button"
                data-dragging={isDragging || undefined}
                className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-40 flex-col items-center justify-center rounded-xs border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]"
                onClick={openFileDialog}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input {...getInputProps()} className="sr-only" aria-label="Upload files" />

                <div className="flex flex-col items-center justify-center text-center">
                    <div className="flex size-11 shrink-0 items-center justify-center" aria-hidden="true">
                        <FileUpIcon className="size-4 opacity-60" />
                    </div>
                    <p className="mb-1.5 text-sm font-medium">Upload files</p>
                    <p className="text-muted-foreground mb-2 text-xs">Drag & drop or click to browse</p>
                    <div className="text-muted-foreground/70 flex flex-wrap justify-center gap-1 text-xs">
                        <span>Max {maxFiles} files</span>
                        <span>∙</span>
                        <span>Up to {formatBytes(maxSize)}</span>
                    </div>
                </div>
            </div>

            {errors.length > 0 && (
                <div className="text-destructive flex items-center gap-1 text-xs" role="alert">
                    <AlertCircleIcon className="size-3 shrink-0" />
                    <span>{errors[0]}</span>
                </div>
            )}

            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="bg-background flex items-center justify-between gap-2 rounded-xs border border-border p-2 pe-3"
                        >
                            <div className="flex items-center gap-1 overflow-hidden">
                                <div className="flex aspect-square size-10 shrink-0 items-center justify-center">{getFileIcon(file)}</div>
                                <div className="flex min-w-0 flex-col gap-0.5">
                                    <p className="truncate text-[13px] font-medium">{file.name}</p>
                                    <p className="text-muted-foreground text-xs">{formatBytes(file.size)}</p>
                                </div>
                            </div>

                            <Button
                                size="icon"
                                variant="ghost"
                                className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                                aria-label="Remove file"
                                onClick={() => handleRemoveFile(file.id)}
                            >
                                <XIcon className="size-4" aria-hidden="true" />
                            </Button>
                        </div>
                    ))}

                    {isUploading &&
                        Array.from({ length: processingFilesCount }).map((_, index) => (
                            <Skeleton key={index} className="w-full h-16 rounded-xs" />
                        ))}
                </div>
            )}
        </div>
    )
}
