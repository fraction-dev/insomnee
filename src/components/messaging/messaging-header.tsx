import { lowerCase, upperFirst } from 'lodash'
import { Activity, Ellipsis } from 'lucide-react'
import Image from 'next/image'
import { OrganizationIntegration } from '~/services/integration/model'
import { Hint } from '../shared/hint'
import { Select } from '../shared/select'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'
import { Switch } from '../ui/switch'

interface Props {
    isLoading?: boolean
    integrations: OrganizationIntegration[]
    selectedIntegration: OrganizationIntegration | null
    isBotEnabled: boolean
    onSelectIntegration: (integration: OrganizationIntegration) => void
    onToggleBot: () => void
}

export const MessagingHeader = ({
    isLoading,
    integrations,
    selectedIntegration,
    isBotEnabled,
    onSelectIntegration,
    onToggleBot,
}: Props) => {
    if (isLoading) {
        return <Skeleton className="h-12 max-w-52 w-full" />
    }

    return (
        <div className="flex justify-between items-center">
            <Select
                disabled={!integrations.length}
                className="max-w-52"
                options={
                    integrations.map((integration) => ({
                        label: upperFirst(lowerCase(integration.type)),
                        value: integration.id,
                    })) ?? []
                }
                value={selectedIntegration?.id}
                onChange={(value) => {
                    const integration = integrations.find((integration) => integration.id === value)
                    if (integration) {
                        onSelectIntegration(integration)
                    }
                }}
            />

            <div className="flex items-center gap-3">
                <Hint
                    content={`AI Agent ${isBotEnabled ? 'operating normally' : 'not operating'}`}
                    containerClassName="flex gap-1 items-center text-sm text-muted-foreground"
                >
                    <span className="font-[400]">AI Agent</span>
                    <Activity className={`size-4 ${isBotEnabled ? 'text-green-600' : 'text-red-600'}`} />
                </Hint>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Ellipsis className="size-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] flex flex-col gap-4">
                        <Image
                            src="https://midday.ai/cdn-cgi/image/width=640,quality=100/https://app.midday.ai/_next/static/media/image.0f8d770e.png"
                            width={640}
                            height={640}
                            alt="Midday"
                            className="w-full h-full object-cover"
                        />

                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium text-base leading-none">AI Agent</h4>
                                <p className="text-xs text-muted-foreground">Update the AI Agent configurations to fit all your needs.</p>
                            </div>
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 items-center gap-4">
                                    <Label htmlFor="enabled">Is enabled?</Label>
                                    <Switch id="enabled" checked={isBotEnabled} onCheckedChange={onToggleBot} />
                                </div>
                                <div className="grid grid-cols-2 items-center gap-4">
                                    <Label htmlFor="voiceMessage">Voice messages</Label>
                                    <Switch id="voiceMessage" />
                                </div>
                                <div className="grid grid-cols-2 items-center gap-4">
                                    <Label htmlFor="delay">Delay</Label>
                                    <Select
                                        className="w-full"
                                        id="delay"
                                        options={[
                                            { label: 'Without delay', value: '0' },
                                            { label: '1 second', value: '1' },
                                            { label: '2 seconds', value: '2' },
                                            { label: '3 seconds', value: '3' },
                                        ]}
                                        value={'0'}
                                        onChange={() => {}}
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <h4 className="font-medium text-base leading-none">Voice messages</h4>
                                <p className="text-xs text-muted-foreground">
                                    Update the voice messages configurations to fit all your needs.
                                </p>
                            </div>

                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 items-center gap-4">
                                    <Label htmlFor="service">Service</Label>
                                    <Select
                                        className="w-full"
                                        id="service"
                                        options={[{ label: 'ElevenLabs', value: 'elevenlabs' }]}
                                        value={'elevenlabs'}
                                        onChange={() => {}}
                                    />
                                </div>
                                <div className="grid grid-cols-2 items-center gap-4">
                                    <Label htmlFor="voice">Voice</Label>
                                    <Select
                                        className="w-full"
                                        id="voice"
                                        options={[{ label: 'Sarah', value: 'sarah' }]}
                                        value={'sarah'}
                                        onChange={() => {}}
                                    />
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
