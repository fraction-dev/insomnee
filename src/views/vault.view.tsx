'use client'

import { useState } from 'react'

import { VaultEmptyState } from '~/components/vault/vault-empty-state'
import { VaultGridLayout } from '~/components/vault/vault-grid-layout'
import { VaultHeader } from '~/components/vault/vault-header'
import { VaultItemPreviewSheet } from '~/components/vault/vault-item-preview/vault-item-preview-sheet'
import { VaultLoadingState } from '~/components/vault/vault-loading-state'
import { VaultTable } from '~/components/vault/vault-table/vault-table'
import { useSheet } from '~/hooks/shared/useSheet'
import { useVaultFiles } from '~/hooks/vault/useVaultFiles'
import { FileUpload } from '~/services/file-upload/model'

interface Props {
    organizationId: string
}

export const VaultView = ({ organizationId }: Props) => {
    const { data, isLoading } = useVaultFiles(organizationId)
    const { id: vaultFileId, isSheetOpen, handleCleanQueryParams } = useSheet('vaultFile')
    const [layout, setLayout] = useState<'grid' | 'table'>('grid')
    const [selectedRows, setSelectedRows] = useState<FileUpload[]>([])

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
        <>
            <div className="flex flex-col gap-4">
                <VaultHeader organizationId={organizationId} layout={layout} onLayoutChange={setLayout} />
                {layout === 'grid' && <VaultGridLayout organizationId={organizationId} files={data?.data ?? []} />}
                {layout === 'table' && (
                    <VaultTable
                        organizationId={organizationId}
                        files={data?.data ?? []}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                    />
                )}
            </div>

            <VaultItemPreviewSheet
                organizationId={organizationId}
                file={data?.data.find((file) => file.id === vaultFileId) ?? null}
                isOpen={isSheetOpen}
                onClose={handleCleanQueryParams}
            />
        </>
    )
}
