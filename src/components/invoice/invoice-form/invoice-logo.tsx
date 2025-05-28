import { XIcon } from 'lucide-react'
import Image from 'next/image'
import { memo, useRef } from 'react'
import { useFormContext } from 'react-hook-form'

import { useUploadFile } from '~/hooks/file-upload/useUploadFile'
import { cn } from '~/lib/shared/utils'

import { InvoicePlaceholder } from './invoice-placeholder'

export const InvoiceLogo = memo(() => {
    const ref = useRef<HTMLInputElement>(null)
    const { watch, setValue } = useFormContext()
    const { mutate: uploadFile } = useUploadFile()

    const imageUrl = watch('imageUrl') as string

    const handleFileUpload = async (file: File | null) => {
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        uploadFile(formData, {
            onSuccess: (data) => {
                if (data.data) {
                    setValue('imageUrl', data.data.url)
                }
            },
        })
    }

    return (
        <div className="flex items-center gap-2 justify-self-end">
            {imageUrl.length ? (
                <div className="relative group">
                    <Image src={imageUrl} alt="Invoice Logo" width={95} height={95} className="justify-self-end group-hover:opacity-50" />
                    <XIcon
                        className={cn('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 cursor-pointer', {
                            'opacity-0 group-hover:opacity-100': imageUrl.length,
                            'opacity-100 group-hover:opacity-0': !imageUrl.length,
                        })}
                        onClick={() => setValue('imageUrl', '')}
                    />
                </div>
            ) : (
                <InvoicePlaceholder className="size-24" onClick={() => ref.current?.click()} />
            )}

            <input ref={ref} type="file" className="hidden" onChange={(e) => handleFileUpload(e.target.files?.[0] ?? null)} />
        </div>
    )
})

InvoiceLogo.displayName = 'InvoiceLogo'
