export interface OverviewStatistics {
    transactionsRevenue: number
    transactionsExpenses: number
    estimatedRevenue: number
    messagingAgentResponsesCount: number
    membersCount: number
    productsAndServicesCount: number
}

export interface OverviewStatisticsParams {
    currency?: string
    startDate?: string
    endDate?: string
}

export interface OverviewChartData {
    month: string
    year: number
    day?: number
    x: number
    y: number
}

export type OverviewChartParams = OverviewStatisticsParams & {
    chartType: OverviewChartType
}

export type OverviewChartType = 'expenses-over-revenue' | 'messaging-agent-statistics'
