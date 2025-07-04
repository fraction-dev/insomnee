import { logger, schedules } from '@trigger.dev/sdk/v3'
import { getAllPendingLeadGenerationRuns, updateLeadGenerationAgentRun } from 'prisma/services/leads-generation'

import { getDurationBetweenDates } from '~/lib/date/date'
import { getLeadsGenerationAgentThreadData } from '~/lib/server/agents/leads-generation/api'
import { LeadsGenerationAgentRunStatus, LeadsGenerationAgentThreadData } from '~/services/leads-generation/model'

export const monitorLeadGenerationAgentCron = schedules.task({
    id: 'monitor-lead-generation-agent-cron',
    cron: '*/30 * * * *', // Each 30 minutes
    run: async () => {
        const records = await getAllPendingLeadGenerationRuns()
        if (!records.length) {
            logger.info('No pending lead generation runs found in the database')
            return
        }

        logger.info('Found pending lead generation runs', { count: records.length })
        for (const record of records) {
            const threadData = await getLeadsGenerationAgentThreadData(record.threadId)
            await Promise.all([
                // updateLeadGenerationRunStatus(record.id, threadData),
                updateExecutionTime(record.id, threadData),
                updateLeadGenerationAgentRunData(record.id, threadData),
            ])
        }
    },
})

const updateLeadGenerationRunStatus = async (recordId: string, thread: LeadsGenerationAgentThreadData) => {
    let status: LeadsGenerationAgentRunStatus = 'PENDING'
    const insights = thread.values.insights || []
    const jobPostings = thread.values.jobPostings || []
    const newsArticles = thread.values.newsArticles || []

    if (thread.status === 'completed' || thread.status === 'idle') {
        if (insights.length === 0 && jobPostings.length === 0 && newsArticles.length === 0) {
            status = 'FAILED'
        } else {
            status = 'COMPLETED'
        }
    } else if (thread.status === 'expired' || thread.status === 'failed' || thread.status === 'cancelled') {
        status = 'FAILED'
    } else {
        status = 'PENDING'
    }

    await updateLeadGenerationAgentRun(recordId, { status })
    logger.info('Updated lead generation run status', { recordId, status })
}

const updateExecutionTime = async (recordId: string, thread: LeadsGenerationAgentThreadData) => {
    const executionTimeInSeconds = getDurationBetweenDates(thread.updated_at, thread.created_at, 'second')
    await updateLeadGenerationAgentRun(recordId, { executionTimeInSeconds: Math.abs(executionTimeInSeconds) })
    logger.info('Updated lead generation run execution time', { recordId, executionTimeInSeconds })
}

const updateLeadGenerationAgentRunData = async (recordId: string, thread: LeadsGenerationAgentThreadData) => {
    await updateLeadGenerationAgentRun(recordId, {
        insights: thread?.values?.insights ?? [],
        jobPostings: thread?.values?.jobPostings ?? [],
        newsArticles: thread?.values?.newsArticles?.filter((article) => article?.evaluation?.matches?.length > 0) ?? [],
    })
    logger.info('Updated lead generation run data', { recordId })
}
