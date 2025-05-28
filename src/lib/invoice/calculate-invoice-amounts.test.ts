import { Invoice } from '~/services/invoice/model'

import { calculateInvoiceAmounts } from './calculate-invoice-amounts'

const invoice: Invoice = {
    id: '1',
    title: 'Invoice 1',
    number: '1',
    imageUrl: 'https://via.placeholder.com/150',
    items: [
        {
            price: 100,
            quantity: 1,
            description: 'Item 1',
        },
    ],
    currency: 'USD',
    discount: 0,
    vat: 0,
    dateFormat: 'DD/MM/YYYY',
    issueDate: new Date(),
    dueDate: new Date(),
    from: 'John Doe',
    paymentDetails: 'Payment Details',
    notes: 'Notes',
    customer: {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            image: 'https://via.placeholder.com/150',
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    },
    tax: 0,
    status: 'DRAFT',
    organizationId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: '1',
    createdByUser: {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        image: 'https://via.placeholder.com/150',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
}

describe('calculateInvoiceAmounts', () => {
    it('should calculate the invoice amounts without any discount or vat', () => {
        const { subtotal, discount, vat, tax, total } = calculateInvoiceAmounts(invoice)

        expect(subtotal).toEqual(100)
        expect(discount).toEqual(0)
        expect(vat).toEqual(0)
        expect(tax).toEqual(0)
        expect(total).toEqual(100)
    })

    it('should calculate the invoice amounts with discount and vat', () => {
        const { subtotal, discount, vat, tax, total } = calculateInvoiceAmounts({ ...invoice, discount: 20, vat: 20 })

        expect(subtotal).toEqual(100)
        expect(discount).toEqual(20)
        expect(vat).toEqual(20)
        expect(tax).toEqual(0)
        expect(total).toEqual(100)
    })
})
