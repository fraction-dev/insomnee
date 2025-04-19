'use client'

import { Download } from 'lucide-react'
import { QRLine } from 'react-qrbtf'

import { Organization } from '~/services/organization/model'

import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'

interface Props {
    organization: Organization
}

export const WebcardQRCard = ({ organization }: Props) => {
    return (
        <Card className="w-full">
            <CardContent className="flex flex-col items-center gap-4">
                <QRLine value={`${process.env.NEXT_PUBLIC_APP_URL}/webcard/${organization.id}`} className="size-42" />
            </CardContent>

            <CardFooter className="flex justify-center items-center">
                <Button variant="outline" className="w-fit">
                    Download
                    <Download className="size-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}
