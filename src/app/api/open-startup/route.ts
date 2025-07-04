import { NextResponse } from 'next/server'

import { createRouteHandler } from '~/core/middleware/with-route-handler'
import { getOpenStartupMetrics } from '~/services/open-startup'
import { OpenStartupStatistics } from '~/services/open-startup/model'
import { BaseResponse } from '~/types/response'

export const GET = createRouteHandler<BaseResponse<OpenStartupStatistics>>()({ auth: false }, async () => {
    const openStartupMetrics = await getOpenStartupMetrics()

    return NextResponse.json({
        data: {
            totalBusinessCount: openStartupMetrics.totalBusinessCount,
            totalTransactionsCount: openStartupMetrics.totalTransactionsCount,
            totalVaultFilesCount: openStartupMetrics.totalVaultFilesCount,
            totalInvoicesCount: openStartupMetrics.totalInvoicesCount,
            totalAssistantResponsesCount: openStartupMetrics.totalAssistantResponsesCount,
            totalLeadGenerationWorkingHoursCount: openStartupMetrics.totalLeadGenerationWorkingHoursCount,
        },
    })
})
