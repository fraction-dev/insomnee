import { BASE_TRANSACTION_CATEGORY } from '../model'

export const formatOrganizationTransactionCategoryType = (type: BASE_TRANSACTION_CATEGORY) => {
    switch (type) {
        case 'INCOME':
            return 'Income'
        case 'EXPENSE':
            return 'Expense'
        case 'TRAVEL':
            return 'Travel'
        case 'OFFICE_SUPPLIES':
            return 'Office Supplies'
        case 'MEALS':
            return 'Meals'
        case 'SOFTWARE':
            return 'Software'
        case 'EQUIPMENT':
            return 'Equipment'
        case 'SALARY':
            return 'Salary'
        case 'INTERNAL_TRANSFER':
            return 'Internal Transfer'
        case 'INTERNET_AND_PHONE':
            return 'Internet and Phone'
        case 'FACILITIES':
            return 'Facilities'
        case 'ACTIVITY':
            return 'Activity'
        case 'FEES':
            return 'Fees'
        case 'TAXES':
            return 'Taxes'
        case 'RENT':
            return 'Rent'
        case 'OTHER':
            return 'Other'
    }
}
