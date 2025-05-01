import { Badge } from '~/components/ui/badge'
import { DialogHeader } from '~/components/ui/dialog'

export const AssistantDialogHeader = () => {
    return (
        <>
            <DialogHeader className="px-5">
                <div className="flex items-center justify-between gap-12">
                    <div className="flex items-center gap-3">
                        <h2 className="text-base font-light">Assistant</h2>
                    </div>

                    <Badge variant="outline" className="border-border text-muted-foreground rounded-xs font-normal">
                        Experimental
                    </Badge>
                </div>
            </DialogHeader>
        </>
    )
}
