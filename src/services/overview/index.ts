import dayjs from 'dayjs'

import { getCurrencyRates } from '../currency-rate'
import { CurrencyRate } from '../currency-rate/model'
import { getOrganizationMessagingAgentResponses, getOrganizationMessagingAgentResponsesCount } from '../organization-messaging-agent'
import { getOrganizationProductsAndServicesCount } from '../organization-products-and-services'
import { getOrganizationTransactions } from '../organization-transaction'
import { OrganizationTransaction } from '../organization-transaction/model'
import { OverviewChartData, OverviewChartParams, OverviewStatisticsParams } from './model'

export const getOrganizationOverviewStatistics = async (organizationId: string, params: OverviewStatisticsParams) => {
    const currency = params.currency ?? 'MDL'
    const { startDate, endDate } = getParamsPeriodDates(params)

    const currencyRates = await getCurrencyRates()
    const transactions = await getOrganizationTransactions(organizationId, startDate, endDate)
    const messagingAgentResponsesCount = await getOrganizationMessagingAgentResponsesCount(organizationId, startDate, endDate)
    const productsAndServicesCount = await getOrganizationProductsAndServicesCount(organizationId)

    const transactionsWithCurrency = transactions.map((transaction) => ({
        ...transaction,
        amount: getTransactionsValueBasedOnCurrency(transaction, currency, currencyRates),
    }))

    return {
        transactionsRevenue: calculateTransactionsRevenue(transactionsWithCurrency),
        transactionsExpenses: calculateTransactionsExpenses(transactionsWithCurrency),
        messagingAgentResponsesCount,
        membersCount: 0,
        productsAndServicesCount,
    }
}

export const getOrganizationOverviewChatData = async (organizationId: string, params: OverviewChartParams) => {
    if (params.chartType === 'expenses-over-revenue') {
        return getTransactionsChartData(organizationId, params)
    }

    return getAgentResponsesChartData(organizationId, params)
}

const calculateTransactionsRevenue = (transactions: OrganizationTransaction[]) => {
    const revenueTransactions = transactions.filter((transaction) => transaction.category.type === 'INCOME')
    const revenue = revenueTransactions.reduce((acc, transaction) => acc + transaction.amount, 0)
    return revenue
}

const calculateTransactionsExpenses = (transactions: OrganizationTransaction[]) => {
    const expensesTransactions = transactions.filter((transaction) => transaction.category.type !== 'INCOME')
    const expenses = expensesTransactions.reduce((acc, transaction) => acc + transaction.amount, 0)
    return expenses
}

const getTransactionsValueBasedOnCurrency = (transaction: OrganizationTransaction, currency: string, currencyRates: CurrencyRate[]) => {
    const currencyRate = currencyRates.find((rate) => rate.currency.toLowerCase() === currency.toLowerCase())
    if (!currencyRate) {
        return 0
    }

    const currencyValue = currencyRate.combinations[transaction.currency.toLowerCase()]
    return transaction.amount / Number(currencyValue ?? 1)
}

const getParamsPeriodDates = (params: OverviewStatisticsParams) => {
    const startDate = dayjs(params.startDate ?? dayjs().subtract(30, 'days').toDate())
        .startOf('day')
        .toDate()

    const endDate = dayjs(params.endDate ?? dayjs().add(30, 'days').toDate())
        .endOf('day')
        .toDate()

    return { startDate, endDate }
}

const getTransactionsChartData = async (organizationId: string, params: OverviewChartParams): Promise<OverviewChartData[]> => {
    const currency = params.currency ?? 'MDL'
    const { startDate, endDate } = getParamsPeriodDates(params)

    const currencyRates = await getCurrencyRates()

    const transactions = await getOrganizationTransactions(organizationId, startDate, endDate)
    const transactionsWithCurrency = transactions.map((transaction) => ({
        ...transaction,
        amount: getTransactionsValueBasedOnCurrency(transaction, currency, currencyRates),
    }))

    const periodMonthsCount = dayjs(dayjs(endDate).endOf('month')).diff(dayjs(startDate).startOf('month'), 'month')

    const chartData: OverviewChartData[] = []

    for (let i = 0; i < periodMonthsCount + 1; i++) {
        const month = dayjs(startDate).add(i, 'month').format('MMM')
        const year = dayjs(startDate).add(i, 'month').year()

        const revenue = calculateTransactionsRevenue(
            transactionsWithCurrency.filter(
                (transaction) =>
                    dayjs(transaction.date).format('MMM') === month && dayjs(transaction.date).format('YYYY') === year.toString(),
            ),
        )

        const expenses = calculateTransactionsExpenses(
            transactionsWithCurrency.filter(
                (transaction) =>
                    dayjs(transaction.date).format('MMM') === month && dayjs(transaction.date).format('YYYY') === year.toString(),
            ),
        )

        chartData.push({
            month,
            year,
            x: revenue,
            y: expenses,
        })
    }

    return chartData
}

const getAgentResponsesChartData = async (organizationId: string, params: OverviewChartParams) => {
    const { startDate, endDate } = getParamsPeriodDates(params)

    const responses = await getOrganizationMessagingAgentResponses(organizationId, startDate, endDate)

    const chartData: OverviewChartData[] = []

    const periodDaysCount = dayjs(dayjs(endDate).endOf('day')).diff(dayjs(startDate).startOf('day'), 'day')

    for (let i = 0; i < periodDaysCount + 1; i++) {
        const day = dayjs(startDate).add(i, 'day').format('DD')
        const month = dayjs(startDate).add(i, 'day').format('MMM')
        const year = dayjs(startDate).add(i, 'day').year()

        const responsesCount = responses.filter(
            (response) =>
                dayjs(response.createdAt).format('DD') === day &&
                dayjs(response.createdAt).format('MMM') === month &&
                dayjs(response.createdAt).format('YYYY') === year.toString(),
        ).length

        chartData.push({
            month,
            year,
            day: Number(day),
            x: responsesCount,
            y: 0,
        })
    }

    return chartData
}
