import { GlobeIcon } from 'lucide-react'

export const LeadGenerationAgentHeader = () => {
    return (
        <div className="flex flex-col gap-2 max-w-sm">
            <div className="flex items-center gap-1.5">
                <div className="p-1.5 rounded-sm bg-amber-600">
                    <GlobeIcon className="size-3 text-white" />
                </div>

                <h2 className="text-base font-normal">Leads Generation agent</h2>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
                Identify companies actively expressing pain points your solution addresses or actively searching for solutions like yours.
            </p>
        </div>
    )
}
