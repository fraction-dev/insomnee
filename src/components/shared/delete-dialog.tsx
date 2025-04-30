import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'

interface Props {
    title?: string
    description: string
    isOpen: boolean
    isLoading?: boolean
    onOpenChange: (isOpen: boolean) => void
    onDelete: () => void
}

export const DeleteDialog = ({ title = 'Are you absolutely sure?', description, isOpen, onOpenChange, onDelete, isLoading }: Props) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col gap-2">
                <h3 className="font-normal text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" isLoading={isLoading} onClick={onDelete}>
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
