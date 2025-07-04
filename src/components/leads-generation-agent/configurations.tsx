import { EllipsisVerticalIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { useRunLeadsGenerationAgent } from '~/hooks/leads-generation/agent/useRunLeadsGenerationAgent'
import { cn } from '~/lib/shared/utils'
import { LeadsGenerationAgentConfiguration, LeadsGenerationAgentRunStatus } from '~/services/leads-generation/model'

import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Hint } from '../ui/hint'
import { Skeleton } from '../ui/skeleton'
import { LeadsGenerationAgentOnboardingSheet } from './leads-generation-agent-onboarding/leads-generation-agent-onboarding-sheet'

export const LeadsGenerationAgentConfigurations = ({
    isLoading = false,
    organizationId,
    configurations,
    selectedConfigurationId,
    onSelectConfiguration,
}: {
    organizationId: string
    isLoading?: boolean
    configurations: LeadsGenerationAgentConfiguration[]
    selectedConfigurationId: string
    onSelectConfiguration: (configurationId: string) => void
}) => {
    const { mutate: runLeadsGenerationAgent } = useRunLeadsGenerationAgent(organizationId)

    const [isSheetOpen, setIsSheetOpen] = useState(false)

    const handleRunLeadsGenerationAgent = (configurationId: string, status: LeadsGenerationAgentRunStatus) => {
        runLeadsGenerationAgent({ configurationId, status })
    }

    if (isLoading) {
        return (
            <div className="flex items-center gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="size-8 w-48" />
                ))}
            </div>
        )
    }

    return (
        <>
            <div className="flex items-center gap-2">
                {configurations.map((configuration) => (
                    <div key={configuration.id} className="flex items-center">
                        <Button key={configuration.id} variant="outline" size="sm" onClick={() => onSelectConfiguration(configuration.id)}>
                            <div className={cn('size-1.5 rounded-full', selectedConfigurationId === configuration.id && 'bg-amber-500')} />
                            <span className="font-normal">{configuration.companyName}</span>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className={'rounded-l-none border-l-0 px-2'} size="sm">
                                    <EllipsisVerticalIcon className="size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    onClick={() =>
                                        handleRunLeadsGenerationAgent(
                                            configuration.id,
                                            configuration.run?.status === 'PENDING' ? 'PAUSED' : 'PENDING',
                                        )
                                    }
                                >
                                    {configuration.run?.status === 'PENDING' ? 'Pause' : 'Run'} "{configuration.companyName}" agent
                                </DropdownMenuItem>
                                <DropdownMenuItem>Update "{configuration.companyName}" configuration</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                    Delete "{configuration.companyName}" configuration
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ))}

                <Hint content="Add a new configuration">
                    <Button variant="outline" size="sm" onClick={() => setIsSheetOpen(true)}>
                        <PlusIcon className="size-4" />
                    </Button>
                </Hint>
            </div>

            <LeadsGenerationAgentOnboardingSheet isOpen={isSheetOpen} organizationId={organizationId} onOpenChange={setIsSheetOpen} />
        </>
    )
}
