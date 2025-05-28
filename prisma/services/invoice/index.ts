import {
    Customer as PrismaCustomer,
    Invoice as PrismaInvoice,
    Organization as PrismaOrganization,
    User as PrismaUser,
} from '@prisma/client'
import { JsonValue } from '@prisma/client/runtime/library'
import dayjs from 'dayjs'
import { prisma } from 'prisma/db'

import { BadRequestException, NotFoundException } from '~/core/exception'
import { Invoice, InvoiceCreatePayload, InvoiceItem, InvoiceUpdatePayload } from '~/services/invoice/model'

type PrismaInvoiceWithRelations = PrismaInvoice & {
    customer:
        | (PrismaCustomer & {
              createdByUser: PrismaUser
              organization: PrismaOrganization
          })
        | null
    createdByUser: PrismaUser
    organization: PrismaOrganization
}

const INCLUDE_CLAUSE = {
    customer: {
        include: {
            createdByUser: true,
            organization: true,
        },
    },
    createdByUser: true,
    organization: true,
}

export const getInvoices = async (organizationId: string) => {
    const invoices = await prisma.invoice.findMany({
        where: { organizationId },
        include: INCLUDE_CLAUSE,
        orderBy: {
            createdAt: 'desc',
        },
    })

    return invoices.map(mapPrismaInvoiceToModel)
}

export const getInvoiceById = async (invoiceId: string) => {
    const invoice = await prisma.invoice.findFirst({
        where: { id: invoiceId },
        include: INCLUDE_CLAUSE,
    })

    if (!invoice) {
        throw new NotFoundException(`Invoice with id ${invoiceId} not found`)
    }

    return mapPrismaInvoiceToModel(invoice)
}

export const createInvoice = async (userId: string, organizationId: string, payload: InvoiceCreatePayload) => {
    const invoice = await prisma.invoice.create({
        data: {
            title: payload.title,
            number: payload.number,
            imageUrl: payload.imageUrl,
            dateFormat: payload.dateFormat,
            currency: payload.currency,
            issueDate: new Date(dayjs(payload.issueDate).toDate()),
            dueDate: new Date(dayjs(payload.dueDate).toDate()),
            from: payload.from,
            organization: { connect: { id: organizationId } },
            createdByUser: { connect: { id: userId } },
            items: JSON.stringify(payload.items),
            customer: { connect: { id: payload.customerId } },
            status: 'DRAFT',
            paymentDetails: payload.paymentDetails ?? null,
            notes: payload.notes ?? null,
            discount: payload.discount ?? 0,
            vat: payload.vat ?? 0,
            tax: payload.tax ?? 0,
        },
        include: INCLUDE_CLAUSE,
    })

    return mapPrismaInvoiceToModel(invoice)
}

export const updateInvoice = async (userId: string, organizationId: string, invoiceId: string, payload: InvoiceUpdatePayload) => {
    const WHERE_CLAUSE = { id: invoiceId, organizationId, createdBy: userId }

    const invoice = await prisma.invoice.findFirst({
        where: WHERE_CLAUSE,
    })

    if (!invoice) {
        throw new BadRequestException(`Invoice with id ${invoiceId} not found or you do not have permission to update it`)
    }

    const updatedInvoice = await prisma.invoice.update({
        where: WHERE_CLAUSE,
        data: {
            title: payload.title ?? undefined,
            number: payload.number ?? undefined,
            imageUrl: payload.imageUrl ?? undefined,
            dateFormat: payload.dateFormat ?? undefined,
            currency: payload.currency ?? undefined,
            issueDate: payload.issueDate ?? undefined,
            dueDate: payload.dueDate ?? undefined,
            from: payload.from ?? undefined,
            customerId: payload.customerId ?? undefined,
            items: JSON.stringify(payload.items ?? undefined),
            paymentDetails: payload.paymentDetails ?? undefined,
            notes: payload.notes ?? undefined,
            discount: payload.discount ?? undefined,
            vat: payload.vat ?? undefined,
            tax: payload.tax ?? undefined,
            status: payload.status ?? undefined,
            internalNotes: payload.internalNotes ?? undefined,
            paidAt: payload.paidAt === null ? null : (payload.paidAt ?? undefined),
            cancelledAt: payload.cancelledAt ?? undefined,
        },
        include: INCLUDE_CLAUSE,
    })

    return mapPrismaInvoiceToModel(updatedInvoice)
}

export const getCustomerInvoices = async (customerId: string) => {
    const invoices = await prisma.invoice.findMany({
        where: { customerId },
        include: INCLUDE_CLAUSE,
        orderBy: {
            createdAt: 'desc',
        },
    })

    return invoices.map(mapPrismaInvoiceToModel)
}

export const deleteManyInvoices = async (userId: string, organizationId: string, invoiceIds: string[]) => {
    const WHERE_CLAUSE = { id: { in: invoiceIds }, organizationId, createdBy: userId }

    const invoices = await prisma.invoice.findMany({
        where: WHERE_CLAUSE,
    })

    if (invoices.length !== invoiceIds.length) {
        throw new BadRequestException(`Some invoices were not found or you do not have permission to delete them`)
    }

    await prisma.invoice.deleteMany({ where: WHERE_CLAUSE })
}

export const mapPrismaInvoiceToModel = (prismaInvoice: PrismaInvoiceWithRelations): Invoice => {
    return {
        id: prismaInvoice.id,
        title: prismaInvoice.title,
        number: prismaInvoice.number,
        imageUrl: prismaInvoice.imageUrl,
        dateFormat: prismaInvoice.dateFormat,
        currency: prismaInvoice.currency,
        issueDate: prismaInvoice.issueDate,
        dueDate: prismaInvoice.dueDate,
        from: prismaInvoice.from,
        customer: prismaInvoice.customer
            ? {
                  id: prismaInvoice.customer.id,
                  name: prismaInvoice.customer.name,
                  email: prismaInvoice.customer.email ?? '',
                  phoneNumber: prismaInvoice.customer.phoneNumber ?? '',
                  avatarUrl: prismaInvoice.customer.avatarUrl ?? '',
                  country: prismaInvoice.customer.country ?? '',
                  city: prismaInvoice.customer.city ?? '',
                  addressLine1: prismaInvoice.customer.addressLine1 ?? '',
                  addressLine2: prismaInvoice.customer.addressLine2 ?? '',
                  zipCode: prismaInvoice.customer.zipCode ?? '',
                  state: prismaInvoice.customer.state ?? '',
                  vatNumber: prismaInvoice.customer.vatNumber ?? '',
                  websiteUrl: prismaInvoice.customer.websiteUrl ?? '',
                  notes: prismaInvoice.customer.notes ?? '',
                  status: prismaInvoice.customer.status,
                  createdAt: prismaInvoice.customer.createdAt,
                  updatedAt: prismaInvoice.customer.updatedAt,
                  createdBy: prismaInvoice.customer.createdByUser,
              }
            : null,
        items: mapPrismaInvoiceItemsToModel(prismaInvoice.items),
        paymentDetails: prismaInvoice.paymentDetails,
        notes: prismaInvoice.notes,
        discount: prismaInvoice.discount ?? 0,
        vat: prismaInvoice.vat ?? 0,
        tax: prismaInvoice.tax ?? 0,
        status: prismaInvoice.status,
        organizationId: prismaInvoice.organizationId,
        createdAt: prismaInvoice.createdAt,
        updatedAt: prismaInvoice.updatedAt,
        createdBy: prismaInvoice.createdBy,
        createdByUser: prismaInvoice.createdByUser,
        paidAt: prismaInvoice.paidAt,
        cancelledAt: prismaInvoice.cancelledAt,
        internalNotes: prismaInvoice.internalNotes ?? '',
    }
}

const mapPrismaInvoiceItemsToModel = (items: JsonValue): InvoiceItem[] => {
    if (!items) return []

    return JSON.parse(items as string).map((item: InvoiceItem) => ({
        description: item.description,
        quantity: item.quantity,
        price: item.price,
    }))
}
