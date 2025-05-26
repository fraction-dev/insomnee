import { lowerCase, upperFirst } from 'lodash'

import { Select } from '~/components/shared/select'
import { Integration } from '~/services/integration/model'

import { InstagramBot } from './instagram-bot'

interface Props {
    organizationId: string
    integrations: Integration[]
    selectedIntegration: Integration | null
    onSelectIntegration: (integration: Integration) => void
}

export const MessagingHeader = ({ organizationId, integrations, selectedIntegration, onSelectIntegration }: Props) => {
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

            {selectedIntegration?.type === 'INSTAGRAM' && (
                <InstagramBot integration={selectedIntegration} organizationId={organizationId} />
            )}
        </div>
    )
}
