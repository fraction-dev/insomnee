import { useRef, useState } from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion'
import { Textarea } from '~/components/ui/textarea'
import { useUpdateInvoice } from '~/hooks/invoice/useUpdateInvoice'
import { useOutsideClick } from '~/hooks/shared/useOutsideClick'
import { Invoice } from '~/services/invoice/model'

interface Props {
    organizationId: string
    invoice: Invoice
}

export const InvoiceDetailsInternalNotesAccordion = ({ organizationId, invoice }: Props) => {
    const ref = useRef<HTMLTextAreaElement>(null)
    const [internalNotes, setInternalNotes] = useState(invoice.internalNotes)

    const { mutate: updateInvoice } = useUpdateInvoice(organizationId)

    useOutsideClick(ref, () => {
        if (!internalNotes || internalNotes === invoice.internalNotes) return

        updateInvoice({
            id: invoice.id,
            internalNotes,
        })
    })

    return (
        <Accordion collapsible type="single" defaultValue={internalNotes?.length ? 'internal-notes' : undefined}>
            <AccordionItem value="internal-notes">
                <AccordionTrigger>
                    <h3 className="text-sm font-normal">Internal Notes</h3>
                </AccordionTrigger>
                <AccordionContent>
                    <Textarea ref={ref} value={internalNotes} onChange={(e) => setInternalNotes(e.target.value)} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
