import MultipleFilesInput from '../shared/file-input/multiple-files-input'
import { Dialog, DialogContent } from '../ui/dialog'

interface Props {
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
}

export const ProductsAndServicesImportModal = ({ isOpen, onOpenChange }: Props) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <MultipleFilesInput />
            </DialogContent>
        </Dialog>
    )
}
