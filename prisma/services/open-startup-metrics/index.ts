import { OpenStartupMetrics as PrismaOpenStartupMetrics } from '@prisma/client'
import { randomUUID } from 'crypto'
import { last, sumBy } from 'lodash'
import { prisma } from 'prisma/db'

import { OpenStartupStatistics } from '~/services/open-startup/model'

export const getOpenStartupMetrics = async (): Promise<OpenStartupStatistics> => {
    const data = await prisma.openStartupMetrics.findMany()

    if (data.length === 0) {
        return {
            totalBusinessCount: 0,
            totalTransactionsCount: 0,
            totalVaultFilesCount: 0,
            totalInvoicesCount: 0,
            totalAssistantResponsesCount: 0,
            totalLeadGenerationWorkingHoursCount: 0,
            createdAt: new Date(),
        }
    }

    /**
     * Sum all fields
     */
    const totalBusinessCount = sumBy(data, 'totalBusinessCount')
    const totalTransactionsCount = sumBy(data, 'totalTransactionsCount')
    const totalVaultFilesCount = sumBy(data, 'totalVaultFilesCount')
    const totalInvoicesCount = sumBy(data, 'totalInvoicesCount')
    const totalAssistantResponsesCount = sumBy(data, 'totalAssistantResponsesCount')
    const totalLeadGenerationWorkingHoursCount = sumBy(data, 'totalLeadGenerationWorkingHoursCount')

    return mapPrismaOpenStartupMetricsToOpenStartupMetrics({
        id: last(data)?.id ?? randomUUID(),
        totalBusinessCount,
        totalTransactionsCount,
        totalVaultFilesCount,
        totalInvoicesCount,
        totalAssistantResponsesCount,
        totalLeadGenerationWorkingHoursCount,
        createdAt: last(data)?.createdAt ?? new Date(),
    })
}

export const updateOpenStartupMetrics = async (openStartupMetrics: OpenStartupStatistics) => {
    await prisma.openStartupMetrics.create({
        data: {
            totalBusinessCount: openStartupMetrics.totalBusinessCount,
            totalTransactionsCount: openStartupMetrics.totalTransactionsCount,
            totalVaultFilesCount: openStartupMetrics.totalVaultFilesCount,
            totalInvoicesCount: openStartupMetrics.totalInvoicesCount,
            totalAssistantResponsesCount: openStartupMetrics.totalAssistantResponsesCount,
            totalLeadGenerationWorkingHoursCount: openStartupMetrics.totalLeadGenerationWorkingHoursCount,
        },
    })
}

const mapPrismaOpenStartupMetricsToOpenStartupMetrics = (prismaOpenStartupMetrics: PrismaOpenStartupMetrics): OpenStartupStatistics => {
    return {
        totalBusinessCount: prismaOpenStartupMetrics.totalBusinessCount,
        totalTransactionsCount: prismaOpenStartupMetrics.totalTransactionsCount,
        totalVaultFilesCount: prismaOpenStartupMetrics.totalVaultFilesCount,
        totalInvoicesCount: prismaOpenStartupMetrics.totalInvoicesCount,
        totalAssistantResponsesCount: prismaOpenStartupMetrics.totalAssistantResponsesCount,
        totalLeadGenerationWorkingHoursCount: prismaOpenStartupMetrics.totalLeadGenerationWorkingHoursCount,
        createdAt: prismaOpenStartupMetrics.createdAt,
    }
}
