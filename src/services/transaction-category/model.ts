export type BASE_TRANSACTION_CATEGORY =
    | 'INCOME'
    | 'EXPENSE'
    | 'TRAVEL'
    | 'OFFICE_SUPPLIES'
    | 'MEALS'
    | 'SOFTWARE'
    | 'EQUIPMENT'
    | 'SALARY'
    | 'INTERNAL_TRANSFER'
    | 'INTERNET_AND_PHONE'
    | 'FACILITIES'
    | 'ACTIVITY'
    | 'FEES'
    | 'TAXES'
    | 'RENT'
    | 'OTHER'

export interface TransactionCategory {
    id: string
    type: BASE_TRANSACTION_CATEGORY
    color: string
}
