'use client'

import { truncate } from 'lodash'
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
import { Button } from '~/components/ui/button'
import { FileMetadata, formatBytes, useFileUpload } from '~/hooks/use-file-upload'

// Create some dummy initial files
const initialFiles = [
    {
        name: 'document.pdf',
        size: 528737,
        type: 'application/pdf',
        url: 'https://example.com/document.pdf',
        id: 'document.pdf-1744638436563-8u5xuls',
    },
    {
        name: 'intro.zip',
        size: 252873,
        type: 'application/zip',
        url: 'https://example.com/intro.zip',
        id: 'intro.zip-1744638436563-8u5xuls',
    },
    {
        name: 'conclusion.xlsx',
        size: 352873,
        type: 'application/xlsx',
        url: 'https://example.com/conclusion.xlsx',
        id: 'conclusion.xlsx-1744638436563-8u5xuls',
    },
]

const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
    const fileType = file.file instanceof File ? file.file.type : file.file.type
    const fileName = file.file instanceof File ? file.file.name : file.file.name

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

interface Props {
    maxSize?: number
    maxFiles?: number
    initialFiles?: FileMetadata[]
    onFilesChange?: (files: FileMetadata[]) => void
    onFilesAdded?: (files: FileMetadata[]) => void
    onFilesRemoved?: (files: FileMetadata[]) => void
}

export default function MultipleFilesInput({
    maxSize = 100 * 1024 * 1024, // 100MB default
    maxFiles = 10, // 10 files default
    initialFiles = [], // No initial files by default
    onFilesChange, // Callback for when files change
    onFilesAdded, // Callback for when files are added
    onFilesRemoved, // Callback for when files are removed
}: Props) {
    const [
        { files, isDragging, errors },
        { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, clearFiles, getInputProps },
    ] = useFileUpload({
        multiple: true,
        maxFiles,
        maxSize,
        initialFiles,
    })

    return (
        <div className="flex flex-col gap-2">
            <div
                role="button"
                onClick={openFileDialog}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                data-dragging={isDragging || undefined}
                className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-40 flex-col items-center justify-center rounded-xs border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px] cursor-default"
            >
                <input {...getInputProps()} className="sr-only" aria-label="Upload files" />

                <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-2 flex size-11 shrink-0 items-center justify-center" aria-hidden="true">
                        <FileUpIcon className="size-4 opacity-60" />
                    </div>
                    <p className="mb-1.5 text-sm font-medium">Upload files</p>
                    <p className="text-muted-foreground mb-2 text-xs">Drag & drop or click to browse</p>
                    <div className="text-muted-foreground/70 flex flex-wrap justify-center gap-1 text-xs">
                        <span>All files</span>
                        <span>∙</span>
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
                                    <p className="truncate text-[12px] font-medium text-neutral-700">
                                        {truncate(file.file instanceof File ? file.file.name : file.file.name, { length: 70 })}
                                    </p>
                                    <p className="text-muted-foreground text-xs">
                                        {formatBytes(file.file instanceof File ? file.file.size : file.file.size)}
                                    </p>
                                </div>
                            </div>

                            <Button
                                size="icon"
                                variant="ghost"
                                className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                                onClick={() => removeFile(file.id)}
                                aria-label="Remove file"
                            >
                                <XIcon className="size-4" aria-hidden="true" />
                            </Button>
                        </div>
                    ))}

                    {files.length > 0 && (
                        <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="outline" onClick={clearFiles}>
                                <span className="text-xs font-normal">Remove all files</span>
                            </Button>
                            <Button size="sm" onClick={clearFiles}>
                                <span className="text-xs font-normal">Continue</span>
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
