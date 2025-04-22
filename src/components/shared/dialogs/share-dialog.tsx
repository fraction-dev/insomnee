import { Copy } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

interface Props {
    isOpen: boolean
    url: string
    onOpenChange: (isOpen: boolean) => void
    onCopy: () => void
}

export const ShareDialog = ({ isOpen, url, onOpenChange, onCopy }: Props) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(url)
        toast.success('Link copied to clipboard')
        onCopy()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input readOnly id="link" defaultValue={url} />
                    </div>
                    <Button type="button" size="sm" className="px-3" onClick={handleCopy}>
                        <span className="sr-only">Copy</span>
                        <Copy />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
