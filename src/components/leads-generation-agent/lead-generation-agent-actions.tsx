import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

import { useLeadsGeneratingConfiguration } from '~/hooks/leads-generation/onboarding/useLeadsGeneratingConfiguration'

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { Hint } from '../ui/hint'
import { Skeleton } from '../ui/skeleton'
import { LeadsGenerationAgentOnboardingSheet } from './leads-generation-agent-onboarding/leads-generation-agent-onboarding-sheet'

export const LeadGenerationAgentActions = ({ organizationId }: { organizationId: string }) => {
    const { data: configurations, isLoading } = useLeadsGeneratingConfiguration(organizationId)

    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

    if (isLoading) {
        return (
            <div className="flex justify-end gap-4 items-center">
                <Skeleton className="size-10" />
            </div>
        )
    }

    return (
        <>
            <div className="flex justify-end gap-2 items-center">
                {configurations?.data?.length && configurations.data.length > 0 && (
                    <div className="flex items-center gap-2">
                        <Hint content="Agent actions">
                            <Button size="icon" variant="outline">
                                <DotsHorizontalIcon className="size-4" />
                            </Button>
                        </Hint>
                    </div>
                )}
            </div>

            <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Before you start with the agent</AlertDialogTitle>
                        <AlertDialogDescription>
                            We need more information about your business to execute the agent. This information is not public and will be
                            used only inside the agent.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <LeadsGenerationAgentOnboardingSheet isOpen={isSheetOpen} organizationId={organizationId} onOpenChange={setIsSheetOpen} />
        </>
    )
}
