'use client'

import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Skeleton } from '~/components/ui/skeleton'
import { useUploadFile } from '~/hooks/file-upload/useUploadFile'
import { useOrganization } from '~/hooks/organization/useOrganization'
import { useUpdateOrganizationLogo } from '~/hooks/organization/useUpdateOrganizationLogo'
import { useUpdateOrganizationName } from '~/hooks/organization/useUpdateOrganizationName'
import { getInitials } from '~/lib/strings'

import { SettingsCard } from '../settings-card'

interface Props {
    organizationId: string
}

export const SettingsGeneralView = ({ organizationId }: Props) => {
    const ref = useRef<HTMLInputElement>(null)

    const { data, isLoading } = useOrganization(organizationId)
    const { mutate: uploadFile } = useUploadFile(organizationId)
    const { mutate: updateOrganizationLogo } = useUpdateOrganizationLogo(organizationId)
    const { mutate: updateOrganizationName, isPending: isUpdatingOrganizationName } = useUpdateOrganizationName(organizationId)

    const [organizationName, setOrganizationName] = useState<string>('')

    useEffect(() => {
        setOrganizationName(data?.data.name ?? '')
    }, [data?.data.name])

    if (isLoading) {
        return (
            <div className="flex flex-col gap-8">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
            </div>
        )
    }

    const handleAvatarClick = () => {
        ref.current?.click()
    }

    const handleFileUpload = async (file: File | null) => {
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        uploadFile(
            { formData, accessType: 'PRIVATE' },
            {
                onSuccess: (data) => {
                    if (data.data) {
                        updateOrganizationLogo(data.data.url, {
                            onSuccess: () => {
                                toast.success('Organization logo updated successfully')
                            },
                        })
                    }
                },
            },
        )
    }

    const handleOrganizationNameUpdate = () => {
        updateOrganizationName(organizationName, {
            onSuccess: () => {
                toast.success('Organization name updated successfully')
            },
        })
    }

    return (
        <div className="flex flex-col gap-8">
            <SettingsCard
                title="Organization image"
                description="This is your team's image. Click on the image to upload a custom one from your files."
                rightHeaderContent={
                    <>
                        <Avatar className="size-16 cursor-pointer" onClick={handleAvatarClick}>
                            <AvatarImage src={data?.data.logoUrl ?? undefined} />
                            <AvatarFallback>{getInitials(data?.data.name ?? '', { maxInitials: 2 })}</AvatarFallback>
                        </Avatar>

                        <input ref={ref} type="file" className="hidden" onChange={(e) => handleFileUpload(e.target.files?.[0] ?? null)} />
                    </>
                }
                footer={<p className="text-xs text-muted-foreground">An avatar is optional but strongly recommended.</p>}
            />

            <SettingsCard
                title="Organization name"
                description="This is your organization's visible name within Insomnee. For example, the name of your company or department."
                footer={
                    <div className="flex w-full items-center justify-between gap-12">
                        <p className="text-xs text-muted-foreground">Please use 32 characters at maximum.</p>
                        <Button
                            disabled={organizationName === data?.data.name || organizationName.length === 0}
                            size="sm"
                            isLoading={isUpdatingOrganizationName}
                            onClick={handleOrganizationNameUpdate}
                        >
                            Save
                        </Button>
                    </div>
                }
            >
                <Input
                    placeholder="Enter organization name"
                    value={organizationName}
                    maxLength={32}
                    onChange={(e) => setOrganizationName(e.target.value)}
                />
            </SettingsCard>
        </div>
    )
}
