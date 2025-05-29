'use client'

import Link from 'next/link'

import { InvoicePreviewContent } from '~/components/invoice/invoice-preview/invoice-preview-content/invoice-preview-content'
import { InvoicePreviewHeader } from '~/components/invoice/invoice-preview/invoice-preview-header'
import { Invoice } from '~/services/invoice/model'

interface Props {
    invoice: Invoice
}

export const InvoiceView = ({ invoice }: Props) => {
    return (
        <div className="py-36 relative">
            <div className="max-w-2xl mx-auto w-full flex flex-col gap-4">
                <InvoicePreviewHeader invoice={invoice} />
                <InvoicePreviewContent invoice={invoice} />
            </div>

            <div className="fixed right-8 bottom-6">
                <Link href="https://insomnee.ai" className="text-[10px] text-muted-foreground">
                    Powered by <span className="text-primary underline">Insomnee</span>
                </Link>
            </div>
        </div>
    )
}
