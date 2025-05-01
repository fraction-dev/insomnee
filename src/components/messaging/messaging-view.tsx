'use client'

import { last } from 'lodash'
import { useEffect, useMemo, useState } from 'react'

import { useInstagramDialogs } from '~/hooks/dialogs/useInstagramDialogs'
import { useOrganizationIntegrations } from '~/hooks/organization-integration/useOrganizationIntegrations'
import { OrganizationIntegration } from '~/services/integration/model'
import { Dialog } from '~/services/messaging/model'

import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'
import { ChatDialog } from './messaging-chat/chat-dialog'
import { ChatMessages } from './messaging-chat/chat-messages'
import { MessagingHeader } from './messaging-header'

interface Props {
    organizationId: string
}

export const MessagingView = ({ organizationId }: Props) => {
    const { data: integrations, isLoading: isLoadingIntegrations } = useOrganizationIntegrations(organizationId)
    const { data: instagramDialogsData, isLoading: isLoadingInstagramDialogs } = useInstagramDialogs(organizationId)

    const [selectedIntegration, setSelectedIntegration] = useState<OrganizationIntegration | null>(null)
    const [selectedDialog, setSelectedDialog] = useState<Dialog | null>(null)

    const isDialogsLoading = isLoadingInstagramDialogs

    useEffect(() => {
        if (integrations?.data && integrations?.data.length > 0) {
            setSelectedIntegration(integrations?.data[0])
        }
    }, [integrations?.data])

    useEffect(() => {
        if (selectedIntegration?.type === 'INSTAGRAM') {
            setSelectedDialog(instagramDialogsData?.data[0] ?? null)
        }
    }, [selectedIntegration, instagramDialogsData?.data])

    const dialogsBasedOnSelectedIntegration = useMemo(() => {
        if (selectedIntegration?.type === 'INSTAGRAM') {
            return instagramDialogsData?.data ?? []
        }

        return []
    }, [selectedIntegration, instagramDialogsData?.data])

    if (!integrations?.data.length && !isLoadingIntegrations) {
        return (
            <div className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">No integrations found</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <MessagingHeader
                organizationId={organizationId}
                integrations={integrations?.data ?? []}
                selectedIntegration={selectedIntegration}
                onSelectIntegration={setSelectedIntegration}
            />

            <Separator />

            {isDialogsLoading || !selectedIntegration ? (
                <div className="flex flex-col gap-4">
                    <Skeleton className="h-[500px] w-full" />
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                        <Input placeholder="Search" />

                        {dialogsBasedOnSelectedIntegration.map((dialog) => (
                            <ChatDialog
                                key={dialog.id}
                                username={dialog.targetUser.username}
                                avatar={dialog.targetUser.avatar}
                                lastMessage={last(dialog.messages ?? [])}
                                isSelected={selectedDialog?.id === dialog.id}
                                onSelect={() => setSelectedDialog(dialog)}
                            />
                        ))}
                    </div>

                    <div className="col-span-2">
                        {selectedDialog && (
                            <ChatMessages
                                type={selectedIntegration.type}
                                targetUser={selectedDialog.targetUser}
                                messages={selectedDialog.messages ?? []}
                                organizationId={organizationId}
                                isSubmitting={isLoadingInstagramDialogs}
                                isBotEnabled={selectedIntegration.instagramIntegration?.configuration?.isBotEnabled ?? false}
                                selectedIntegration={selectedIntegration}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
