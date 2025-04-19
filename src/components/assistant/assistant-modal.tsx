import { IndentIncrease } from 'lucide-react'

import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export const AssistantModal = ({ isOpen, onClose }: Props) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="[&>button]:hidden">
                <DialogHeader className="border-b border-border pb-4">
                    <div className="flex items-center justify-between gap-12">
                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="icon">
                                <IndentIncrease className="size-4" />
                            </Button>

                            <h2 className="text-base font-normal">Assistant</h2>
                        </div>
                    </div>
                </DialogHeader>

                <h1>Assistant</h1>
            </DialogContent>
        </Dialog>
    )
}
