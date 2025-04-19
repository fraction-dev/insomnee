import Image from 'next/image'
import { createElement } from 'react'
import { IconType } from 'react-icons/lib'

import { IntegrationType } from '~/services/integration/model'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'
import { IntegrationInstagramButton } from './integration-instagram-button'

export interface IntegrationCardItem {
    type: IntegrationType
    icon?: IconType
    image?: string
    title: string
    description: string
    isComingSoon?: boolean
    isConnected?: boolean
}

interface Props {
    instagramAppId: string
    ngrokUrl: string
    organizationId: string
    integration: IntegrationCardItem
}

export const IntegrationCard = ({ instagramAppId, ngrokUrl, organizationId, integration }: Props) => {
    const { icon, image, title, description, isComingSoon, isConnected } = integration

    const renderConnectComponent = () => {
        switch (integration.type) {
            case 'INSTAGRAM':
                return <IntegrationInstagramButton appId={instagramAppId} ngrokUrl={ngrokUrl} organizationId={organizationId} />
            default:
                return null
        }
    }

    return (
        <Card>
            <CardContent className="flex flex-col gap-5 h-full">
                {icon && createElement(icon, { className: 'size-9' })}
                {image && <Image src={image} alt={title} width={36} height={36} />}

                <div className="gap-2 flex flex-col">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">{title}</h3>
                        {isComingSoon && (
                            <Badge variant="outline" className="text-[10px] flex justify-center items-center font-mono opacity-70">
                                Coming Soon
                            </Badge>
                        )}

                        {isConnected && (
                            <Badge className="text-[10px] flex justify-center items-center font-mono opacity-70">Connected</Badge>
                        )}
                    </div>
                    <p className="text-[12px] text-muted-foreground/80 leading-relaxed">{description}</p>
                </div>
            </CardContent>

            <CardFooter>
                {isConnected ? (
                    <Button disabled variant="outline">
                        Connected
                    </Button>
                ) : (
                    renderConnectComponent()
                )}
            </CardFooter>
        </Card>
    )
}
