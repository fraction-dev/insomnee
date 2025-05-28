import { truncate } from 'lodash'
import { CheckIcon, CopyIcon, ExternalLinkIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '~/components/ui/button'
import { Hint } from '~/components/ui/hint'
import { Input } from '~/components/ui/input'
import { ROUTES } from '~/config/routes'
import { Invoice } from '~/services/invoice/model'

interface Props {
    invoice: Invoice
}

export const InvoiceDetailsLink = ({ invoice }: Props) => {
    const [isCopied, setIsCopied] = useState(false)

    const INVOICE_URL = `${window.location.origin}${ROUTES.INVOICE(invoice.id)}`

    const handleCopy = () => {
        navigator.clipboard.writeText(INVOICE_URL)
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }

    const handleRedirectToInvoice = () => {
        window.open(INVOICE_URL, '_blank')
    }

    return (
        <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm font-light">Invoice link</p>
            <div className="flex items-center gap-2">
                <div className="relative w-full">
                    <Input
                        disabled
                        value={truncate(INVOICE_URL, { length: 50 })}
                        className="cursor-pointer disabled:cursor-pointer w-full pr-24"
                    />

                    <div className="absolute flex items-center gap-1 right-2 top-1/2 -translate-y-1/2">
                        <Hint content="Open in new tab">
                            <ExternalLinkIcon className="w-4 h-4 text-muted-foreground cursor-pointer" onClick={handleRedirectToInvoice} />
                        </Hint>
                    </div>
                </div>

                <Hint content="Copy to clipboard">
                    <Button variant="outline" size="icon" onClick={handleCopy}>
                        {isCopied ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
                    </Button>
                </Hint>
            </div>
        </div>
    )
}
