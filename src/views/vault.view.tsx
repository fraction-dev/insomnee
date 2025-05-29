'use client'

import { useState } from 'react'

import { VaultEmptyState } from '~/components/vault/vault-empty-state'
import { VaultGridLayout } from '~/components/vault/vault-grid-layout'
import { VaultHeader } from '~/components/vault/vault-header'
import { VaultLoadingState } from '~/components/vault/vault-loading-state'
import { useVaultFiles } from '~/hooks/vault/useVaultFiles'

interface Props {
    organizationId: string
}

export const VaultView = ({ organizationId }: Props) => {
    const [layout, setLayout] = useState<'grid' | 'table'>('grid')
    const { data, isLoading } = useVaultFiles(organizationId)

    if (isLoading) {
        return <VaultLoadingState />
    }

    if (!isLoading && data?.data.length === 0) {
        return (
            <div className="flex flex-col gap-4">
                <VaultHeader organizationId={organizationId} layout={layout} onLayoutChange={setLayout} />
                <VaultEmptyState organizationId={organizationId} />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <VaultHeader organizationId={organizationId} layout={layout} onLayoutChange={setLayout} />
            {layout === 'grid' && <VaultGridLayout organizationId={organizationId} files={data?.data ?? []} />}
        </div>
    )
}
