import { randomInt } from 'crypto'
import * as OpenStartupMetricsDB from 'prisma/services/open-startup-metrics'

export const simulateOpenStartupMetrics = async () => {
    const randomBusinessesCount = randomInt(5, 15)
    const randomTransactionsCount = randomInt(50, 150)
    const randomVaultFilesCount = randomInt(200, 1500)
    const randomInvoicesCount = randomInt(50, 150)
    const randomAssistantResponsesCount = randomInt(200, 2000)
    const randomLeadGenerationWorkingHoursCount = randomInt(24, 48)

    await OpenStartupMetricsDB.updateOpenStartupMetrics({
        totalBusinessCount: randomBusinessesCount,
        totalTransactionsCount: randomTransactionsCount,
        totalVaultFilesCount: randomVaultFilesCount,
        totalInvoicesCount: randomInvoicesCount,
        totalAssistantResponsesCount: randomAssistantResponsesCount,
        totalLeadGenerationWorkingHoursCount: randomLeadGenerationWorkingHoursCount,
        createdAt: new Date(),
    })
}

export const getOpenStartupMetrics = async () => {
    return OpenStartupMetricsDB.getOpenStartupMetrics()
}
