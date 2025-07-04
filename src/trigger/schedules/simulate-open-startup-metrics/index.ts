import { schedules } from '@trigger.dev/sdk/v3'

import { simulateOpenStartupMetrics } from '~/services/open-startup'

export const simulateOpenStartupMetricsCron = schedules.task({
    id: 'simulate-open-startup-metrics-cron',
    cron: '0 0 * * *', // Every day at midnight
    run: async () => {
        await simulateOpenStartupMetrics()
    },
})
