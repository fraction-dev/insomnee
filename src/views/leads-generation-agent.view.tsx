'use client'

import { useEffect, useState } from 'react'

import { LeadsGenerationAgentConfigurations } from '~/components/leads-generation-agent/configurations'
import { LeadGenerationAgentActions } from '~/components/leads-generation-agent/lead-generation-agent-actions'
import { LeadGenerationAgentHeader } from '~/components/leads-generation-agent/lead-generation-agent-header'
import { LeadGenerationAgentTabs } from '~/components/leads-generation-agent/lead-generation-agent-tabs'
import { RunContent } from '~/components/leads-generation-agent/run/run-content'
import { useLeadsGeneratingConfiguration } from '~/hooks/leads-generation/onboarding/useLeadsGeneratingConfiguration'
import { LeadsGenerationAgentConfiguration } from '~/services/leads-generation/model'

export const LeadsGenerationAgentView = ({ organizationId }: { organizationId: string }) => {
    const { data: configurations, isLoading } = useLeadsGeneratingConfiguration(organizationId)

    const [selectedConfiguration, setSelectedConfiguration] = useState<LeadsGenerationAgentConfiguration | null>(null)

    useEffect(() => {
        if (configurations && configurations.data.length > 0) {
            setSelectedConfiguration(configurations.data[0])
        }
    }, [configurations])

    return (
        <div className="flex flex-col gap-4">
            <LeadGenerationAgentHeader />
            <LeadGenerationAgentTabs organizationId={organizationId} />
            <div className="flex justify-between items-center gap-12">
                <LeadsGenerationAgentConfigurations
                    isLoading={isLoading}
                    organizationId={organizationId}
                    configurations={configurations?.data ?? []}
                    selectedConfigurationId={selectedConfiguration?.id ?? ''}
                    onSelectConfiguration={(configurationId) => {
                        const configuration = configurations?.data.find((configuration) => configuration.id === configurationId)
                        if (configuration) {
                            setSelectedConfiguration(configuration)
                        }
                    }}
                />
                <LeadGenerationAgentActions organizationId={organizationId} />
            </div>

            <div className="grid grid-cols-3 gap-12">
                <div className="col-span-2">
                    <RunContent run={selectedConfiguration?.run ?? null} />
                </div>
            </div>
        </div>
    )
}
