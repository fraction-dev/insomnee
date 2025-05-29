import { useState } from 'react'
import { toast } from 'sonner'

import { FileUpload } from '~/services/file-upload/model'

export const useVaultFileActions = (file: FileUpload) => {
    const [isCopied, setIsCopied] = useState(false)

    const handleCopyFileLink = () => {
        navigator.clipboard.writeText(file.url)
        setIsCopied(true)
        toast.success('File link copied to clipboard')
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }

    const handleDownloadFile = () => {
        window.open(file.url, '_blank')
    }

    return {
        isCopied,
        handleCopyFileLink,
        handleDownloadFile,
    }
}
