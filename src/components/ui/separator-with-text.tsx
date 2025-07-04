import { Separator } from './separator'

export const SeparatorWithText = ({ text }: { text: string }) => {
    return (
        <div className="flex items-center gap-2 w-full">
            <Separator className="flex-1" />
            <p className="text-xs font-light text-muted-foreground">{text}</p>
            <Separator className="flex-1" />
        </div>
    )
}
