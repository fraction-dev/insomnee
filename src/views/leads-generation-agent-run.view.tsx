'use client'

import { RunContent } from '~/components/leads-generation-agent/run/run-content'
import { RunTabs } from '~/components/leads-generation-agent/run/run-tabs'
import { LeadsGenerationAgentRun } from '~/services/leads-generation/model'

/**
 * View containing two sections:
 * 1. News, Insights content section
 * 2. Fileting section
 */

export const LeadsGenerationAgentRunView = ({ run }: { run: LeadsGenerationAgentRun | null }) => {
    return (
        <div className="flex flex-col gap-4">
            <RunTabs run={run} />

            <div className="grid grid-cols-3 gap-12">
                <div className="col-span-2">
                    <RunContent run={run} />
                </div>
            </div>
        </div>
    )
}
