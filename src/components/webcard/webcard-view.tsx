'use client'

import { Organization } from '~/services/organization/model'

import { WebcardQRCard } from './webcard-qr-card'
import { WebcardTotalClicksCard } from './webcard-total-clicks-card'

interface Props {
    organization: Organization
}

export const WebcardView = ({ organization }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-5 gap-4">
                <WebcardQRCard organization={organization} />
                <WebcardTotalClicksCard />
                <WebcardTotalClicksCard />
                <WebcardTotalClicksCard />
            </div>
        </div>
    )
}
