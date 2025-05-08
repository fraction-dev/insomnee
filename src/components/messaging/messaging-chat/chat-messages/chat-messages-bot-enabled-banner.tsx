import { Button } from '~/components/ui/button'

interface Props {
    isLoading?: boolean
    onBotDisableClick?: () => void
}

export const ChatMessagesBotEnabledBanner = ({ isLoading, onBotDisableClick }: Props) => {
    return (
        <div className="h-24 bg-neutral-100">
            <div className="max-w-lg flex justify-center text-center m-auto h-full items-center flex-col gap-2 text-neutral-800">
                <span className="text-xs leading-relaxed">
                    You enabled the bot for this conversation. It will respond to your messages automatically.
                </span>

                <Button isLoading={isLoading} variant="outline" size="sm" className="text-xs" onClick={onBotDisableClick}>
                    Disable bot
                </Button>
            </div>
        </div>
    )
}
