import { Invoice } from '~/services/invoice/model'

export const calculateInvoiceAmounts = (invoice: Invoice) => {
    const subtotal = invoice.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const discount = (invoice.discount * subtotal) / 100
    const vat = (invoice.vat * subtotal) / 100
    const tax = (invoice.tax * subtotal) / 100

    const total = subtotal - discount + vat + tax

    return {
        subtotal,
        discount,
        vat,
        tax,
        total,
    }
}
