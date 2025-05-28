import _ from 'lodash'

import { Invoice } from '~/services/invoice/model'

export const calculateInvoiceAmounts = (invoice: Invoice) => {
    const subtotal = _.sumBy(invoice.items, 'price')
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
