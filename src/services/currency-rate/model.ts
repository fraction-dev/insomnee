export interface CurrencyRate {
    id: string
    currency: string
    symbol: string
    combinations: Record<string, string>
    createdAt: Date
    updatedAt: Date
}
