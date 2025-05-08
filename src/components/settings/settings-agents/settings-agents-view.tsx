'use client'

import { isNil } from 'lodash'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '~/components/ui/button'
import { Skeleton } from '~/components/ui/skeleton'
import { ROUTES } from '~/config/routes'
import { useSettingsAgents } from '~/hooks/settings/useSettingsAgents'
import { SettingsAgentsOutput } from '~/services/settings/model'

import { SettingsCard } from '../settings-card'
import { MessagingAgentView } from './messaging-agent/messaging-agent-view'

interface Props {
    organizationId: string
}

export const SettingsAgentsView = ({ organizationId }: Props) => {
    const { data, isLoading } = useSettingsAgents(organizationId)

    const isAgentInData = (agent: keyof SettingsAgentsOutput) => {
        if (!data?.data || isNil(data.data[agent])) return false
        return agent in data.data
    }

    const isDataEmpty = !data?.data || Object.keys(data.data).length === 0

    const messagingAgent = isAgentInData('messagingAgent') ? data?.data.messagingAgent : null

    return (
        <div className="flex flex-col gap-6">
            {isLoading && <Skeleton className="h-96 w-full" />}

            {isDataEmpty && !isLoading && (
                <SettingsCard
                    title="No agents found"
                    description="You need at least one integration to start using agents"
                    rightHeaderContent={
                        <Link href={ROUTES.DASHBOARD.INTEGRATIONS(organizationId)}>
                            <Button variant="outline" size="sm">
                                <PlusIcon className="h-4 w-4" />
                                Add integration
                            </Button>
                        </Link>
                    }
                />
            )}

            {!isLoading && messagingAgent && <MessagingAgentView organizationId={organizationId} agent={messagingAgent} />}
        </div>
    )
}
