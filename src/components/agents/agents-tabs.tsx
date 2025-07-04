import { GlobeIcon, PenIcon, SmileIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { ROUTES } from '~/config/routes'
import { cn } from '~/lib/shared/utils'

import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'

const CONTENT = (organizationId: string) => [
    {
        title: 'Leads Generation agent',
        description: `Identify companies actively expressing pain points your solution addresses or actively searching for solutions like yours.`,
        icon: GlobeIcon,
        url: ROUTES.DASHBOARD.AGENTS.LEAD_GENERATION(organizationId),
        isComingSoon: false,
        iconClassName: 'bg-amber-600',
    },
    {
        title: 'Prospect Tracking agent',
        description: `Continuously monitor your prospects and customers to understand their needs and preferences. Decode their strategies and uncover their pain points.`,
        icon: PenIcon,
        url: '#',
        isComingSoon: true,
        iconClassName: 'bg-sky-600',
    },
    {
        title: 'Customer Success agent',
        description: `Monitor your customers' satisfaction and engagement to ensure they are getting the most value from your solution.`,
        icon: SmileIcon,
        url: '#',
        isComingSoon: true,
        iconClassName: 'bg-emerald-600',
    },
]

export const AgentsTabs = ({ organizationId }: { organizationId: string }) => {
    const router = useRouter()
    const content = CONTENT(organizationId)

    return (
        <div className="grid grid-cols-4 gap-4">
            {content.map((item, index) => (
                <Card
                    key={index}
                    className={cn('cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900', item.url === '#' && 'cursor-default')}
                    onClick={() => item.url !== '#' && router.push(item.url)}
                >
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <div className={cn('rounded-lg p-2', item.iconClassName)}>
                                <item.icon className={cn('size-3 text-white')} />
                            </div>
                            <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{item.title}</h3>

                            {item.isComingSoon && (
                                <Badge variant="outline" className="text-[11px] text-muted-foreground font-normal border-muted-foreground">
                                    Coming soon
                                </Badge>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
