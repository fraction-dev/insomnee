'use client'

import { OrganizationsCreateForm } from './organizations-create-form'

export const OrganizationCreateView = () => {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold leading-normal">We need some additional information about your business</h2>

            <p className="text-sm text-muted-foreground leading-relaxed">
                This information will be used to create your organization and will be used to identify your business.
            </p>

            <OrganizationsCreateForm />
        </div>
    )
}
