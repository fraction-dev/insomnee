import { FileUpload } from '~/services/file-upload/model'

import { VaultGridItem } from './vault-grid-item/vault-grid-item'

interface Props {
    organizationId: string
    files: FileUpload[]
}

export const VaultGridLayout = ({ organizationId, files }: Props) => {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {files.map((file) => (
                <VaultGridItem key={file.id} organizationId={organizationId} file={file} />
            ))}
        </div>
    )
}
