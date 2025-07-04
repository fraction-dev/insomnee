import dayjs from 'dayjs'
import { isNil } from 'lodash'
import * as InvoiceDB from 'prisma/services/invoice'

import { BadRequestException } from '~/core/exception'
import { calculateInvoiceAmounts } from '~/lib/invoice/calculate-invoice-amounts'

import { Invoice, InvoiceCreatePayload, InvoicesStatistics, InvoiceStatus, InvoiceUpdatePayload } from './model'

export const createInvoice = async (userId: string, organizationId: string, payload: InvoiceCreatePayload): Promise<Invoice> => {
    return InvoiceDB.createInvoice(userId, organizationId, payload)
}

export const updateInvoice = async (
    userId: string,
    organizationId: string,
    invoiceId: string,
    payload: InvoiceUpdatePayload,
): Promise<Invoice> => {
    /**
     * If "paidAt" is provided, we need to check if the invoice is already paid.
     * If already paid, we need to throw an error.
     * If not, we need to update the invoice status to "PAID" and update the "paidAt" date.
     */
    const invoice = await InvoiceDB.getInvoiceById(invoiceId)
    if (!isNil(payload.paidAt) && invoice.status === 'PAID') {
        throw new BadRequestException('Invoice is already paid')
    }

    if (!isNil(payload.paidAt) && invoice.status !== 'PAID') {
        payload.status = 'PAID'
    }

    if (!isNil(payload.status) && payload.status !== 'PAID' && invoice.paidAt) {
        payload.paidAt = null
    }

    return InvoiceDB.updateInvoice(userId, organizationId, invoiceId, payload)
}

export const getInvoices = async (organizationId: string): Promise<Invoice[]> => {
    return InvoiceDB.getInvoices(organizationId)
}

export const deleteManyInvoices = async (userId: string, organizationId: string, invoiceIds: string[]) => {
    return InvoiceDB.deleteManyInvoices(userId, organizationId, invoiceIds)
}

export const getInvoicesStatistics = async (organizationId: string): Promise<InvoicesStatistics> => {
    /**
     * Payment score is generated using following formula:
     * - if the invoice is paid in time (before or on dueDate), then the score is good.
     * - if the invoice is paid after dueDate, then the score is bad.
     * - if the invoice is not paid, then the score is undefined (doesn't contribute to score).
     * - Maximum score is 100 when all invoices are paid on time.
     */
    const invoices = await InvoiceDB.getInvoices(organizationId)
    if (invoices.length === 0) {
        return {
            total: { invoicesCount: 0, amount: 0 },
            overdue: { invoicesCount: 0, amount: 0 },
            paid: { invoicesCount: 0, amount: 0 },
            paymentScore: 0,
        }
    }

    let paymentScore = 0
    const totalInvoicesAmount = invoices.reduce((acc, invoice) => acc + calculateInvoiceAmounts(invoice).total, 0)

    /**
     * Overdue - invoices that are past due date and not paid
     */
    const filterClause: Record<InvoiceStatus, boolean> = {
        OVERDUE: false, // OVERDUE invoices should be included in overdue calculation
        UNPAID: false, // UNPAID invoices should be included in overdue calculation
        DRAFT: true, // DRAFT invoices are excluded
        CANCELLED: true, // CANCELLED invoices are excluded
        SENT: false, // SENT invoices should be included in overdue calculation
        PAID: true, // PAID invoices are excluded from overdue
    }
    const overdueInvoices = invoices.filter((invoice) => dayjs(invoice.dueDate).isBefore(dayjs()) && !filterClause[invoice.status])
    const overdueInvoicesAmount = overdueInvoices.reduce((acc, invoice) => acc + calculateInvoiceAmounts(invoice).total, 0)

    /**
     * Paid invoices
     */
    const paidInvoices = invoices.filter((invoice) => invoice.status === 'PAID')
    const paidInvoicesAmount = paidInvoices.reduce((acc, invoice) => acc + calculateInvoiceAmounts(invoice).total, 0)

    /**
     * Calculate payment score based on paid invoices timing
     */
    if (paidInvoices.length > 0) {
        // Handle edge case where total amount is 0
        if (totalInvoicesAmount === 0) {
            // If all invoices have 0 amount but are paid, give perfect score
            paymentScore = 100
        } else {
            // Separate paid invoices into on-time and late payments
            const paidOnTimeInvoices = paidInvoices.filter((invoice) => {
                // Assuming invoice has a paidDate field, otherwise use current logic
                // For now, we'll assume if it's paid and not in overdue list, it was paid on time
                return (
                    !dayjs(invoice.dueDate).isBefore(dayjs()) || (invoice.paidAt && dayjs(invoice.paidAt).isBefore(dayjs(invoice.dueDate)))
                )
            })

            const paidLateInvoices = paidInvoices.filter((invoice) => {
                return (
                    dayjs(invoice.dueDate).isBefore(dayjs()) && (!invoice.paidAt || dayjs(invoice.paidAt).isAfter(dayjs(invoice.dueDate)))
                )
            })

            const paidOnTimeAmount = paidOnTimeInvoices.reduce((acc, invoice) => acc + calculateInvoiceAmounts(invoice).total, 0)
            const paidLateAmount = paidLateInvoices.reduce((acc, invoice) => acc + calculateInvoiceAmounts(invoice).total, 0)

            // Score calculation:
            // - On-time payments contribute 100% to score
            // - Late payments contribute 50% to score (or adjust this penalty as needed)
            // - Unpaid invoices contribute 0% to score
            const totalScoredAmount = paidOnTimeAmount + paidLateAmount * 0.5
            paymentScore = Math.min(100, (totalScoredAmount / totalInvoicesAmount) * 100)
        }
    }

    return {
        total: { invoicesCount: invoices.length, amount: totalInvoicesAmount },
        overdue: { invoicesCount: overdueInvoices.length, amount: overdueInvoicesAmount },
        paid: { invoicesCount: paidInvoices.length, amount: paidInvoicesAmount },
        paymentScore: isNaN(paymentScore) ? 0 : Math.round(paymentScore * 100) / 100, // Handle NaN and round to 2 decimal places
    }
}

export const getTotalInvoicesCount = async (): Promise<number> => {
    return InvoiceDB.getTotalInvoicesCount()
}
