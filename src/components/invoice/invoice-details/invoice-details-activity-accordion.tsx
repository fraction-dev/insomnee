import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion'
import { formatDateToReadableString } from '~/lib/date'
import { cn } from '~/lib/shared/utils'
import { Invoice } from '~/services/invoice/model'

interface Props {
    invoice: Invoice
}

export const InvoiceDetailsActivityAccordion = ({ invoice }: Props) => {
    return (
        <Accordion collapsible type="single" defaultValue="activity">
            <AccordionItem value="activity">
                <AccordionTrigger>
                    <h3 className="text-sm font-normal">Activity</h3>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-5">
                        <ActivityItem isCompleted label="Created" value={formatDateToReadableString(invoice.createdAt)} isLast={false} />
                        <ActivityItem
                            isLast
                            isCompleted={invoice.paidAt !== null}
                            label="Paid"
                            value={formatDateToReadableString(invoice.paidAt ?? null)}
                        />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

const ActivityItem = ({
    label,
    value,
    isCompleted = false,
    isLast = false,
}: {
    label: string
    value: string
    isCompleted?: boolean
    isLast?: boolean
}) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div
                        className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-foreground' : 'border border-muted-foreground bg-background'}`}
                    />

                    {!isLast && <div className="absolute top-2 left-1/2 w-px h-6 bg-border -translate-x-1/2" />}
                </div>
                <span className={cn('text-sm font-light', isCompleted ? 'text-black dark:text-neutral-50' : 'text-muted-foreground')}>
                    {label}
                </span>
            </div>

            <span className="text-sm text-muted-foreground">{value}</span>
        </div>
    )
}
