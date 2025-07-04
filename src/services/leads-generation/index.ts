import { tasks } from '@trigger.dev/sdk/v3'
import * as LeadsGenerationDB from 'prisma/services/leads-generation'

import { fillLeadGenerationAgentConfigurationTask } from '~/trigger/tasks/fill-lead-generation-agent-configuration'
import { TriggerTasks } from '~/trigger/types/tasks'

import {
    LeadsGenerationAgentConfiguration,
    LeadsGenerationAgentOnboardingDirtyFormSchemaType,
    LeadsGenerationAgentRun,
    LeadsGenerationAgentRunStatus,
    LeadsGenerationAgentStatistics,
    LeadsGenerationAgentThreadRunResponse,
} from './model'

// Statistics calculation utilities
const calculateTotalExecutionTimeInSeconds = (runs: LeadsGenerationAgentRun[]): number => {
    return runs.reduce((acc, run) => acc + (run.executionTimeInSeconds || 0), 0)
}

const calculateTotalInsights = (runs: LeadsGenerationAgentRun[]): number => {
    return runs.reduce((acc, run) => acc + (run.insights?.length ?? 0), 0)
}

const calculateSuccessRatePercentage = (runs: LeadsGenerationAgentRun[]): number => {
    if (runs.length === 0) return 0

    const successfulRuns = runs.filter((run) => run.status === 'COMPLETED').length
    return (successfulRuns / runs.length) * 100
}

// Public API functions
export const createConfiguration = async (organizationId: string, input: LeadsGenerationAgentOnboardingDirtyFormSchemaType) => {
    const { companyName, companyWebsite, solution, targetCountry } = input

    // Save to database
    const configuration = await LeadsGenerationDB.createConfiguration(organizationId, {
        companyName,
        newsFramework: {
            searchKeywords: [],
            essentialSignals: [],
            additionalSignals: [],
            searchConfig: {
                countries: [],
            },
        },
        solution,
        icpCompanySizeRange: [],
        icpIndustryVertical: [],
        icpAnnualRevenue: [],
        icpHqLocation: '',
        icpPhysicalPresence: false,
        decisionMakers: [],
        status: 'PAUSED',
        run: null,
    })

    await tasks.trigger<typeof fillLeadGenerationAgentConfigurationTask>(TriggerTasks.FILL_LEAD_GENERATION_AGENT_CONFIGURATION, {
        configurationId: configuration.id,
        organizationId,
        companyName,
        companyWebsite,
        solution,
        targetCountry,
    })

    return configuration
}

export const getOrganizationLeadGenerationRuns = async (organizationId: string): Promise<LeadsGenerationAgentRun[]> => {
    return await LeadsGenerationDB.getOrganizationLeadGenerationRuns(organizationId)
}

export const getConfigurationByOrganizationId = async (organizationId: string) => {
    return await LeadsGenerationDB.getConfigurationByOrganizationId(organizationId)
}

export const createLeadGenerationRun = async (
    organizationId: string,
    configurationId: string,
    data: LeadsGenerationAgentThreadRunResponse,
) => {
    return await LeadsGenerationDB.createLeadGenerationRun(organizationId, configurationId, data)
}

export const getOrganizationLeadGenerationStatistics = async (organizationId: string): Promise<LeadsGenerationAgentStatistics> => {
    const runs = await LeadsGenerationDB.getOrganizationLeadGenerationRuns(organizationId)
    const sortedRuns = runs.sort((a, b) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime())

    return {
        totalExecutionTimeInSeconds: calculateTotalExecutionTimeInSeconds(runs),
        totalInsights: calculateTotalInsights(runs),
        lastRunAt: sortedRuns?.[0]?.createdAt ?? null,
        successRatePercentage: calculateSuccessRatePercentage(runs),
    }
}

export const getLeadGenerationRunById = async (runId: string): Promise<LeadsGenerationAgentRun> => {
    return await LeadsGenerationDB.getLeadGenerationRunById(runId)
}

export const getCompanyConfigurations = async (organizationId: string): Promise<LeadsGenerationAgentConfiguration[]> => {
    return await LeadsGenerationDB.getCompanyConfigurations(organizationId)
}

export const getOrganizationConfigurationById = async (
    organizationId: string,
    configurationId: string,
): Promise<LeadsGenerationAgentConfiguration> => {
    return await LeadsGenerationDB.getOrganizationConfigurationById(organizationId, configurationId)
}

export const getConfigurationRun = async (configurationId: string): Promise<LeadsGenerationAgentRun | null> => {
    return await LeadsGenerationDB.getConfigurationRun(configurationId)
}

export const updateConfigurationRunStatus = async (configurationId: string, status: LeadsGenerationAgentRunStatus) => {
    return await LeadsGenerationDB.updateConfigurationRunStatus(configurationId, status)
}
