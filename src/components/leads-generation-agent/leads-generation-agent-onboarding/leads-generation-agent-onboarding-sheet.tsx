import { ScrollArea } from '~/components/ui/scroll-area'
import { Sheet, SheetContent } from '~/components/ui/sheet'

import { LeadsGenerationAgentOnboardingForm } from './leads-generation-agent-onboarding-form'

interface Props {
    organizationId: string
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

export const LeadsGenerationAgentOnboardingSheet = ({ organizationId, isOpen, onOpenChange }: Props) => {
    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="max-h-[calc(100vh-20px)] mt-3 mb-3 mr-3 rounded-xs p-4 min-w-2xl">
                <ScrollArea isScrollBarHidden className="h-full pb-12">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-lg font-medium">Before you start with the agent</h3>
                            <p className="text-xs text-muted-foreground">
                                We never share this information with anyone, it is used only inside the agent.
                            </p>
                        </div>

                        <LeadsGenerationAgentOnboardingForm organizationId={organizationId} />
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
