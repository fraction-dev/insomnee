export const ICPAnnualRevenue = {
    UNDER_1M: 'UNDER_1M',
    ONE_TO_10M: 'ONE_TO_10M',
    TEN_TO_50M: 'TEN_TO_50M',
    FIFTY_TO_100M: 'FIFTY_TO_100M',
    HUNDRED_TO_500M: 'HUNDRED_TO_500M',
    FIVE_HUNDRED_TO_1B: 'FIVE_HUNDRED_TO_1B',
    OVER_1B: 'OVER_1B',
} as const

export type ICPAnnualRevenue = keyof typeof ICPAnnualRevenue

export const ICPCompanySizeRange = {
    SOLO: 'SOLO',
    MICRO: 'MICRO',
    SMALL: 'SMALL',
    MID_MARKET: 'MID_MARKET',
    ENTERPRISE: 'ENTERPRISE',
    GLOBAL_ENTERPRISE: 'GLOBAL_ENTERPRISE',
} as const

export type ICPCompanySizeRange = keyof typeof ICPCompanySizeRange

export const ICPIndustryVertical = {
    TECHNOLOGY: 'TECHNOLOGY',
    FINANCE: 'FINANCE',
    HEALTHCARE: 'HEALTHCARE',
    MANUFACTURING: 'MANUFACTURING',
    RETAIL: 'RETAIL',
    EDUCATION: 'EDUCATION',
    CONSULTING: 'CONSULTING',
    GOVERNMENT: 'GOVERNMENT',
    NONPROFIT: 'NONPROFIT',
    OTHER: 'OTHER',
} as const

export type ICPIndustryVertical = keyof typeof ICPIndustryVertical
