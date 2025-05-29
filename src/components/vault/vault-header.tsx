import { useQueryClient } from '@tanstack/react-query'
import { LayoutGrid, LucideIcon, PlusIcon, Rows3Icon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

import { useUploadFile } from '~/hooks/file-upload/useUploadFile'
import { cn } from '~/lib/shared/utils'
import { SUPPORTED_FILE_MIME_TYPES } from '~/services/file-upload/consts'

import { Button } from '../ui/button'
import { Hint } from '../ui/hint'

const LAYOUTS: Array<{ icon: LucideIcon; value: 'grid' | 'table' }> = [
    { icon: LayoutGrid, value: 'grid' },
    { icon: Rows3Icon, value: 'table' },
]

interface Props {
    organizationId: string
    layout: 'grid' | 'table'
    onLayoutChange: (layout: 'grid' | 'table') => void
}

export const VaultHeader = ({ organizationId, layout, onLayoutChange }: Props) => {
    const queryClient = useQueryClient()
    const ref = useRef<HTMLInputElement>(null)
    const { mutate: uploadFile, isPending: isUploading } = useUploadFile(organizationId)

    const handleFileUpload = async (file: File | null) => {
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)
        uploadFile({ formData, accessType: 'PUBLIC' }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vault-files'] }) })
    }

    const handleUploadClick = () => {
        ref.current?.click()
    }

    useEffect(() => {
        if (isUploading) {
            toast.loading('Uploading file...')
        } else {
            toast.dismiss()
        }
    }, [isUploading])

    return (
        <>
            <div className="flex justify-end items-center gap-2">
                {LAYOUTS.map((l) => (
                    <Hint key={l.value} content={`Switch to ${l.value} layout`}>
                        <Button
                            size="icon"
                            variant="outline"
                            className={cn(l.value === layout && 'bg-neutral-100')}
                            onClick={() => onLayoutChange(l.value)}
                        >
                            <l.icon className="size-4" />
                        </Button>
                    </Hint>
                ))}

                <Button size="icon" variant="outline" onClick={handleUploadClick}>
                    <PlusIcon className="size-4" />
                </Button>
            </div>

            <input
                ref={ref}
                multiple
                type="file"
                className="hidden"
                accept={SUPPORTED_FILE_MIME_TYPES.join(',')}
                onChange={(e) => handleFileUpload(e.target.files?.[0] ?? null)}
            />
        </>
    )
}
