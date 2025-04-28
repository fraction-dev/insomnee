import { Activity, Ellipsis } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Hint } from '~/components/shared/hint'
import { Select } from '~/components/shared/select'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Separator } from '~/components/ui/separator'
import { Switch } from '~/components/ui/switch'
import { useUpdateOrganizationIntegrationInstagram } from '~/hooks/organization-integration/useUpdateOrganizationIntegrationInstagram'
import { OrganizationIntegration } from '~/services/integration/model'

interface Props {
    integration: OrganizationIntegration
    organizationId: string
}

export const InstagramBot = ({ integration, organizationId }: Props) => {
    const { mutate: updateConfiguration, isPending } = useUpdateOrganizationIntegrationInstagram(organizationId)

    const isBotEnabled = integration.instagramIntegration?.configuration?.isBotEnabled ?? false
    const isVoiceMessageResponseEnabled = integration.instagramIntegration?.configuration?.isVoiceMessageResponseEnabled ?? false

    const [executingEntity, setExecutingEntity] = useState<'bot' | 'voiceMessage' | null>(null)

    useEffect(() => {
        if (!isPending) {
            setExecutingEntity(null)
        }
    }, [isPending])

    const handleToggleBot = async () => {
        setExecutingEntity('bot')

        updateConfiguration({ integrationId: integration.id, payload: { isBotEnabled: !isBotEnabled } })
    }

    const handleToggleVoiceMessage = async () => {
        setExecutingEntity('voiceMessage')

        updateConfiguration({ integrationId: integration.id, payload: { isVoiceMessageResponseEnabled: !isVoiceMessageResponseEnabled } })
    }

    return (
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
                                <Switch
                                    id="enabled"
                                    checked={isBotEnabled}
                                    onCheckedChange={handleToggleBot}
                                    isLoading={isPending && executingEntity === 'bot'}
                                />
                            </div>
                            <div className="grid grid-cols-2 items-center gap-4">
                                <Label htmlFor="voiceMessage">Voice messages</Label>
                                <Switch
                                    id="voiceMessage"
                                    checked={isVoiceMessageResponseEnabled}
                                    onCheckedChange={handleToggleVoiceMessage}
                                    isLoading={isPending && executingEntity === 'voiceMessage'}
                                />
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <h4 className="font-medium text-base leading-none">Voice messages</h4>
                            <p className="text-xs text-muted-foreground">Update the voice messages configurations to fit all your needs.</p>
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
    )
}
