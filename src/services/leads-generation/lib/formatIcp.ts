import { ICP_ANNUAL_REVENUE, ICP_COMPANY_SIZE_RANGES, ICP_DECISION_MAKERS, ICP_INDUSTRY_VERTICALS } from '../consts/icp'

export const getReadableICPRevenueList = (): { label: string; value: (typeof ICP_ANNUAL_REVENUE)[number] }[] => {
    return ICP_ANNUAL_REVENUE.map((annualRevenue) => ({
        label: formatIcpAnnualRevenue(annualRevenue).label,
        value: annualRevenue,
    }))
}

export const getReadableICPDecisionMakersList = (): { label: string; value: (typeof ICP_DECISION_MAKERS)[number] }[] => {
    return ICP_DECISION_MAKERS.map((decisionMaker) => ({
        label: formatIcpDecisionMaker(decisionMaker),
        value: decisionMaker,
    }))
}

export const getReadableICPCompanySizeRangeList = (): { label: string; value: (typeof ICP_COMPANY_SIZE_RANGES)[number] }[] => {
    return ICP_COMPANY_SIZE_RANGES.map((companySizeRange) => ({
        label: formatIcpCompanySizeRange(companySizeRange),
        value: companySizeRange,
    }))
}

export const getReadableICPIndustryVerticalList = (): { label: string; value: (typeof ICP_INDUSTRY_VERTICALS)[number] }[] => {
    return ICP_INDUSTRY_VERTICALS.map((industryVertical) => ({
        label: formatIcpIndustryVertical(industryVertical),
        value: industryVertical,
    }))
}

const formatIcpDecisionMaker = (decisionMaker: (typeof ICP_DECISION_MAKERS)[number]): string => {
    const decisionMakersMap = {
        ABOVE_C_LEVEL: 'Above C-Level',
        C_LEVEL: 'C-Level',
        VP_LEVEL: 'VP-Level',
        DIRECTOR: 'Director',
        HEAD_OF: 'Head of',
        SENIOR_MANAGER: 'Senior Manager',
        MANAGER: 'Manager',
        SENIOR_IC: 'Senior IC',
        IC: 'IC',
        ENTRY: 'Entry',
        OTHER: 'Other',
        UNKNOWN: 'Unknown',
    }

    return decisionMakersMap[decisionMaker]
}

const formatIcpCompanySizeRange = (companySizeRange: (typeof ICP_COMPANY_SIZE_RANGES)[number]): string => {
    const companySizeRangeMap = {
        SOLO: 'Solo',
        MICRO: 'Micro',
        SMALL: 'Small',
        MID_MARKET: 'Mid-Market',
        ENTERPRISE: 'Enterprise',
        GLOBAL_ENTERPRISE: 'Global Enterprise',
    }

    return companySizeRangeMap[companySizeRange]
}

const formatIcpIndustryVertical = (industryVertical: (typeof ICP_INDUSTRY_VERTICALS)[number]): string => {
    const industryVerticalMap = {
        TECHNOLOGY: 'Technology',
        FINANCE: 'Finance',
        HEALTHCARE: 'Healthcare',
        EDUCATION: 'Education',
        MANUFACTURING: 'Manufacturing',
        RETAIL: 'Retail',
        CONSULTING: 'Consulting',
        GOVERNMENT: 'Government',
        NONPROFIT: 'Nonprofit',
        OTHER: 'Other',
    }

    return industryVerticalMap[industryVertical]
}

const formatIcpAnnualRevenue = (annualRevenue: (typeof ICP_ANNUAL_REVENUE)[number]): { label: string; value: string } => {
    const annualRevenueMap = {
        UNDER_1M: 'Under $1M',
        ONE_TO_10M: '$1M - $10M',
        TEN_TO_50M: '$10M - $50M',
        FIFTY_TO_100M: '$50M - $100M',
        HUNDRED_TO_500M: '$100M - $500M',
        FIVE_HUNDRED_TO_1B: '$500M - $1B',
        OVER_1B: 'Over $1B',
    }

    return {
        label: annualRevenueMap[annualRevenue],
        value: annualRevenue,
    }
}
